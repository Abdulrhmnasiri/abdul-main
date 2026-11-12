/// <reference types="vitest/config" />
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

export default defineConfig({
  // Relative asset URLs keep the build portable between a custom domain and
  // a GitHub Pages project path.
  base: './',
  plugins: [prerenderPages()],
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
    include: ['tests/**/*.test.ts'],
  },
});
