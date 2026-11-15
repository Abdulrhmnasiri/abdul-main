import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import type { AddressInfo } from 'node:net';
import { extname, join, resolve, sep } from 'node:path';

/** The project path the site is served under on GitHub Pages. */
export const BASE_PATH = '/abdul-main/';

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

export interface PagesServer {
  /** Site root URL, including the project path. */
  url: string;
  /**
   * HTML documents are read from `pages`, every other file from `files`.
   * Pointing them at different releases reproduces a CDN or browser cache
   * that still holds the previous release's pages after a deploy.
   */
  releases: { pages: string; files: string };
  /** Request paths that answered 404, in order. */
  notFound: string[];
  close: () => Promise<void>;
}

/**
 * A local stand-in for GitHub Pages: serves a directory under the project
 * path, sends `Cache-Control: max-age=600`, redirects a directory URL
 * without its trailing slash, and answers a missing file with an HTML 404.
 */
export async function startPagesServer(release: string): Promise<PagesServer> {
  const releases = { pages: release, files: release };
  const notFound: string[] = [];

  const server = createServer((request, response) => {
    const { pathname } = new URL(request.url ?? '/', 'http://localhost');
    if (!pathname.startsWith(BASE_PATH)) {
      if (pathname === BASE_PATH.slice(0, -1)) {
        response.writeHead(301, { location: BASE_PATH }).end();
        return;
      }
      notFound.push(pathname);
      response.writeHead(404, { 'content-type': TYPES['.html']! }).end('<h1>404</h1>');
      return;
    }

    const relative = decodeURIComponent(pathname.slice(BASE_PATH.length));
    const isPage = relative === '' || relative.endsWith('/') || relative.endsWith('.html');
    const root = resolve(isPage ? releases.pages : releases.files);
    let path = resolve(join(root, relative));
    const inside = path === root || path.startsWith(root + sep);

    if (inside && existsSync(path) && statSync(path).isDirectory()) {
      if (!pathname.endsWith('/')) {
        response.writeHead(301, { location: `${pathname}/` }).end();
        return;
      }
      path = join(path, 'index.html');
    }
    if (!inside || !existsSync(path)) {
      notFound.push(pathname);
      response.writeHead(404, { 'content-type': TYPES['.html']! }).end('<h1>404</h1>');
      return;
    }
    response
      .writeHead(200, { 'content-type': TYPES[extname(path)] ?? 'application/octet-stream', 'cache-control': 'max-age=600' })
      .end(readFileSync(path));
  });

  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address() as AddressInfo;
  return {
    url: `http://localhost:${port}${BASE_PATH}`,
    releases,
    notFound,
    close: () => new Promise<void>((resolve) => server.close(() => resolve())),
  };
}
