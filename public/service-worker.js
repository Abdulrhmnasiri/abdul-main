// Retirement worker.
//
// The previous version of this site installed a cache-first service worker
// that served index.html from its precache, so a visitor only saw a new
// release after the worker itself changed. This site no longer needs offline
// support, so this replacement removes the old caches, unregisters itself and
// reloads open tabs onto the live pages. Keep it deployed until old installs
// have aged out (a few months), then delete it. Current pages also remove the
// old registration themselves (src/client/legacy-worker.ts), because browsers
// only check a worker for updates about once a day.
//
// Only this site's own caches are removed: every GitHub Pages project under
// the same account shares one origin, and so one CacheStorage.
const CACHE_PREFIX = 'aa-portfolio-';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((key) => key.startsWith(CACHE_PREFIX)).map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((client) => client.navigate(client.url));
    })(),
  );
});
