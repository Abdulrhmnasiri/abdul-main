// Validates the built site in dist/: every relative link, script, stylesheet,
// image and CSS url() must resolve to a file, in-page anchors must exist, and
// the manifest and sitemap must point at real pages. Run after `vite build`.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
if (!existsSync(dist)) {
  console.error('dist/ not found. Run `npm run build` first.');
  process.exit(1);
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const files = walk(dist);
const pages = files.filter((f) => f.endsWith('.html'));
const failures = [];
const fail = (where, message) => failures.push(`${relative(dist, where)}: ${message}`);

const isExternal = (url) => /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(url);
const idsOf = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

/** Resolves a relative URL from `from` to a file inside dist, or null. */
function resolveTarget(from, url) {
  const path = decodeURIComponent(url.split(/[?#]/)[0]);
  const target = path === '' ? from : resolve(dirname(from), path);
  if (!target.startsWith(dist)) return null;
  if (existsSync(target) && statSync(target).isDirectory()) return join(target, 'index.html');
  return target;
}

let checked = 0;
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const ids = idsOf(html);
  for (const [, , url] of html.matchAll(/\s(href|src)="([^"]*)"/g)) {
    if (!url || isExternal(url)) continue;
    checked++;
    const [, hash] = url.split('#');
    const target = resolveTarget(page, url);
    if (!target || !existsSync(target)) {
      fail(page, `missing target ${url}`);
      continue;
    }
    if (hash && target.endsWith('.html')) {
      const targetIds = target === page ? ids : idsOf(readFileSync(target, 'utf8'));
      if (!targetIds.has(hash)) fail(page, `no #${hash} in ${relative(dist, target)}`);
    }
  }
}

for (const css of files.filter((f) => f.endsWith('.css'))) {
  for (const [, url] of readFileSync(css, 'utf8').matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) {
    if (isExternal(url) || url.startsWith('data:')) continue;
    checked++;
    const target = resolveTarget(css, url);
    if (!target || !existsSync(target)) fail(css, `missing url(${url})`);
  }
}

const manifest = join(dist, 'manifest.webmanifest');
if (existsSync(manifest)) {
  for (const icon of JSON.parse(readFileSync(manifest, 'utf8')).icons ?? []) {
    checked++;
    if (!existsSync(join(dist, icon.src))) fail(manifest, `missing icon ${icon.src}`);
  }
}

const sitemap = join(dist, 'sitemap.xml');
if (existsSync(sitemap)) {
  for (const [, loc] of readFileSync(sitemap, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) {
    checked++;
    const path = new URL(loc).pathname.replace(/^\/abdul-main\//, '');
    const target = join(dist, path.endsWith('/') || path === '' ? `${path}index.html` : path);
    if (!existsSync(target)) fail(sitemap, `sitemap URL has no page: ${loc}`);
  }
}

if (failures.length) {
  console.error(`Found ${failures.length} problem(s) in dist/:\n  ${failures.join('\n  ')}`);
  process.exit(1);
}
console.log(`dist/ OK: ${pages.length} pages, ${checked} references resolved.`);
