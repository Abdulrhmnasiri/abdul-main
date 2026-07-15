const CACHE_NAME = 'aa-portfolio-v42';
// Public app shell = the one-page personal-identity homepage only. systems.html
// and casebook.html remain hidden, unlinked drafts outside the public tree.
// research.html and operations-knowledge-center.html are approved, public,
// and indexable, but stay unprecached by policy — they always load fresh
// from the network so their content and section navigation never go stale.
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
      // Only ever remove this app's own previous cache generations. A cache
      // name that doesn't start with our prefix belongs to something else on
      // the origin and must be left alone.
      .then(cacheNames => Promise.all(
        cacheNames
          .filter(name => name.startsWith('aa-portfolio-') && name !== CACHE_NAME)
          .map(name => caches.delete(name))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;

  // Only ever handle simple GET requests for this origin's own assets. POSTs
  // (Web3Forms submissions) and every cross-origin request (Web3Forms,
  // hCaptcha, Google Fonts, LinkedIn, GitHub, or anything else) pass straight
  // through to the network untouched.
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;

  const isNavigation = request.mode === 'navigate' || request.destination === 'document';

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).catch(() => {
        // Offline fallback only makes sense for an HTML page navigation. A
        // missing script, stylesheet, image, font, or PDF must fail as
        // itself — never silently replaced with the homepage.
        if (isNavigation) return caches.match('./index.html');
        return Response.error();
      });
    })
  );
});
