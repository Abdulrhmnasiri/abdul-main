// Fixture: the cache-first worker that earlier versions of the site installed,
// reduced to the files in this directory. Its caching and fetch logic is the
// original's, because the retirement test depends on exactly that behavior.
const CACHE_NAME = 'aa-portfolio-v42';
const ASSETS_TO_CACHE = ['./', './index.html', './style.css'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE.map((url) => new Request(url, { cache: 'reload' }))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) => Promise.all(names.filter((name) => name.startsWith('aa-portfolio-') && name !== CACHE_NAME).map((name) => caches.delete(name))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;
  const isNavigation = request.mode === 'navigate' || request.destination === 'document';
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).catch(() => (isNavigation ? caches.match('./index.html') : Response.error()));
    }),
  );
});
