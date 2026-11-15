/**
 * Removes the offline worker and caches installed by earlier versions of the
 * site, which served stale pages cache-first.
 *
 * `public/service-worker.js` retires the worker on the browser's own update
 * check, but browsers only run that check once a day. Any page that does
 * reach the network can finish the job straight away.
 *
 * Scope matters: every GitHub Pages project of an account shares one origin,
 * and so one CacheStorage and one worker registry. Only the registration at
 * this site's root and caches with this site's prefix are touched.
 */
const CACHE_PREFIX = 'aa-portfolio-';

export async function retireLegacyWorker(siteRoot: URL): Promise<void> {
  if (!('serviceWorker' in navigator)) return;
  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.filter((r) => r.scope === siteRoot.href).map((r) => r.unregister()));
    if (!('caches' in window)) return;
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name.startsWith(CACHE_PREFIX)).map((name) => caches.delete(name)));
  } catch {
    // Cleanup is best effort: a failure here must never affect the page.
  }
}
