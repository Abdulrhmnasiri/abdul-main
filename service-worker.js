const CACHE_NAME = 'aa-portfolio-v38';
// Public app shell = the one-page founder-identity homepage only. systems.html and
// casebook.html remain hidden, unlinked drafts. research.html and
// operations-knowledge-center.html are linked from the homepage but stay
// noindex and unprecached by policy; they load from network when opened directly.
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/profile-abdulrahman-asiri.jpg',
  './icons/envelope.svg',
  './icons/linkedin.svg',
  './icons/github.svg',
  './src/main.js',
  './src/modules/state.js',
  './src/modules/i18n.js',
  './src/modules/site-nav.js',
  './src/modules/pwa.js',
  './src/modules/contact-form.js',
  './src/data/translations.js',
  './src/data/site-translations.js',
  './src/data/contact-config.js',
  './src/utils/dom.js',
  './src/utils/lang.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      // { cache: 'reload' } forces each precache fetch past the browser's own
      // HTTP cache, so a new SW version can never precache stale bytes.
      .then(cache => cache.addAll(ASSETS_TO_CACHE.map(url => new Request(url, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => caches.match('./index.html'));
    })
  );
});
