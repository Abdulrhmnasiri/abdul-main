/// <reference types="vitest/config" />
import { posix } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin, type ViteDevServer } from 'vite';
import type { Locale } from './src/content/types.ts';

const RENDER_ENTRY = '/src/render/page.ts';

type PageModule = typeof import('./src/render/page.ts');

/**
 * Pre-renders each language's page from the typed content in src/content.
 *
 * In dev the renderer is loaded through Vite's SSR module graph so edits to
 * content or templates show up on reload without restarting the server.
 */
function prerenderPages(): Plugin {
  let server: ViteDevServer | undefined;

  const loadRenderer = async (): Promise<PageModule> =>
    server ? ((await server.ssrLoadModule(RENDER_ENTRY)) as PageModule) : import('./src/render/page.ts');

  return {
    name: 'prerender-pages',
    configureServer(devServer) {
      server = devServer;
    },
    transformIndexHtml: {
      order: 'pre',
      async handler(html, ctx) {
        const locale: Locale = ctx.path.startsWith('/en/') ? 'en' : 'ar';
        const { renderHead, renderBody } = await loadRenderer();
        return html.replace('<!--render:head-->', renderHead(locale)).replace('<!--render:body-->', renderBody(locale));
      },
    },
    handleHotUpdate({ file, server: devServer }) {
      if (/[\\/]src[\\/](content|render|lib)[\\/]/.test(file)) {
        devServer.ws.send({ type: 'full-reload' });
      }
    },
  };
}

/**
 * Inlines the built CSS and JavaScript into every page.
 *
 * GitHub Pages replaces all files on each deploy, so the content-hashed
 * assets of the previous release start returning 404. Pages are cached for
 * ten minutes (at the CDN and in browsers), so a visitor can still receive
 * the previous release's HTML, and with it a link to a stylesheet that no
 * longer exists. A self-contained page cannot fall out of step with its
 * assets. Images keep their own files: their hashes only change with the
 * image itself.
 */
function inlineAssets(): Plugin {
  const SOURCE = { css: /<link\b[^>]*\bhref="([^"]+\.css)"[^>]*>/g, js: /<script\b[^>]*\bsrc="([^"]+\.js)"[^>]*><\/script>/g };
  return {
    name: 'inline-assets',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const inlined = new Set<string>();

      const read = (fileName: string): string => {
        const output = bundle[fileName];
        if (!output) throw new Error(`inline-assets: ${fileName} is not in the bundle`);
        if (output.type === 'chunk' && (output.imports.length || output.dynamicImports.length)) {
          throw new Error(`inline-assets: ${fileName} imports other chunks and cannot be inlined`);
        }
        const text = output.type === 'chunk' ? output.code : String(output.source);
        if (/<\/(?:script|style)|<!--/i.test(text)) throw new Error(`inline-assets: ${fileName} contains markup that would end the tag early`);
        inlined.add(fileName);
        return text;
      };

      for (const [pageName, page] of Object.entries(bundle)) {
        if (page.type !== 'asset' || !pageName.endsWith('.html')) continue;
        const target = (href: string) => posix.join(posix.dirname(pageName), href);
        page.source = String(page.source)
          .replace(SOURCE.css, (_tag, href: string) => `<style>${read(target(href))}</style>`)
          .replace(SOURCE.js, (_tag, href: string) => `<script type="module">${read(target(href))}</script>`);
      }
      for (const fileName of inlined) delete bundle[fileName];
    },
  };
}

export default defineConfig({
  // Relative asset URLs keep the build portable between a custom domain and
  // a GitHub Pages project path.
  base: './',
  plugins: [prerenderPages(), inlineAssets()],
  build: {
    target: 'es2022',
    rollupOptions: {
      input: {
        ar: fileURLToPath(new URL('./index.html', import.meta.url)),
        en: fileURLToPath(new URL('./en/index.html', import.meta.url)),
      },
    },
  },
  test: {
    // Browser tests need built output and installed browsers; see vitest.e2e.config.ts.
    include: ['tests/**/*.test.ts'],
    exclude: ['tests/e2e/**', 'node_modules/**'],
  },
});
