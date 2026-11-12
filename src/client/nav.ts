/**
 * Marks the nav link of the section currently in view. A section can point
 * at another section's link with `data-nav`, so both works light up "Work".
 */
export function initSectionHighlight(): void {
  const links = new Map<string, HTMLAnchorElement>();
  for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')) {
    links.set(link.hash.slice(1), link);
  }
  const sections = Array.from(document.querySelectorAll<HTMLElement>('main > section[id]'));
  const linkFor = (s: HTMLElement) => links.get(s.dataset.nav ?? s.id);

  const visible = new Set<HTMLElement>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) visible.add(el);
        else visible.delete(el);
      }
      // With several sections in the band, the one furthest down the page wins.
      const current = sections.filter((s) => visible.has(s)).at(-1);
      const active = current ? linkFor(current) : undefined;
      for (const link of links.values()) {
        if (link === active) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      }
    },
    // A thin band across the upper middle of the viewport decides "current".
    { rootMargin: '-35% 0px -55% 0px' },
  );
  sections.forEach((s) => observer.observe(s));
}

/** Keeps the reader's position when switching language. */
export function initLanguageSwitch(): void {
  const link = document.querySelector<HTMLAnchorElement>('[data-lang-switch]');
  link?.addEventListener('click', () => {
    if (location.hash) link.hash = location.hash;
  });
}
