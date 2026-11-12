import { profile } from '../content/profile.ts';
import type { Locale } from '../content/types.ts';
import { html, raw, type SafeHtml } from '../lib/html.ts';
import { renderContact } from './contact.ts';
import { createContext, type RenderContext } from './context.ts';
import { renderAdvisor } from './advisor.ts';
import { renderGuide } from './guide.ts';
import { renderHero } from './hero.ts';

const OG_LOCALE: Record<Locale, string> = { ar: 'ar_SA', en: 'en_US' };
const PAGE_PATH: Record<Locale, string> = { ar: '/', en: '/en/' };

const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Readex+Pro:wght@300..600&display=swap';

function renderJsonLd({ locale }: RenderContext): SafeHtml {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name[locale],
    jobTitle: profile.role[locale],
    address: { '@type': 'PostalAddress', addressLocality: 'Riyadh', addressCountry: 'SA' },
    sameAs: Object.values(profile.links),
    ...(profile.siteUrl ? { url: profile.siteUrl + PAGE_PATH[locale] } : {}),
  };
  // `<` is escaped so content can never close the script element early.
  return raw(`<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`);
}

function renderAbsoluteLinks({ locale, alternateLocale }: RenderContext): SafeHtml | null {
  if (!profile.siteUrl) return null;
  const url = (l: Locale) => profile.siteUrl + PAGE_PATH[l];
  return html`
    <link rel="canonical" href="${url(locale)}" />
    <link rel="alternate" hreflang="${locale}" href="${url(locale)}" />
    <link rel="alternate" hreflang="${alternateLocale}" href="${url(alternateLocale)}" />
    <link rel="alternate" hreflang="x-default" href="${url('ar')}" />
    <meta property="og:url" content="${url(locale)}" />
    <meta property="og:image" content="${profile.siteUrl}/social-preview.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  `;
}

export function renderHead(locale: Locale): string {
  const ctx = createContext(locale);
  const { t, root, alternateLocale } = ctx;
  return html`
    <title>${t.meta.title}</title>
    <meta name="description" content="${t.meta.description}" />
    <meta name="color-scheme" content="light" />
    <meta name="theme-color" content="#ffffff" />
    <meta property="og:type" content="profile" />
    <meta property="og:title" content="${t.meta.title}" />
    <meta property="og:description" content="${t.meta.description}" />
    <meta property="og:locale" content="${OG_LOCALE[locale]}" />
    <meta property="og:locale:alternate" content="${OG_LOCALE[alternateLocale]}" />
    <meta name="twitter:card" content="summary_large_image" />
    ${renderAbsoluteLinks(ctx)}
    <link rel="icon" href="${root}favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="${root}icons/icon-192.png" />
    <link rel="manifest" href="${root}manifest.webmanifest" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="${FONTS_URL}" />
    ${renderJsonLd(ctx)}
  `.value;
}

function renderTopbar({ t, root, alternateHref, alternateLocale }: RenderContext): SafeHtml {
  return html`
    <header class="topbar">
      <nav class="nav" aria-label="${t.nav.label}">
        <ul>
          <li><a href="#guide" data-nav-link>${t.nav.work}</a></li>
          <li><a href="#contact" data-nav-link>${t.nav.contact}</a></li>
          <li><a href="${root}${profile.cv}" download>${t.nav.cv}</a></li>
        </ul>
      </nav>
      <a class="lang-switch" href="${alternateHref}" hreflang="${alternateLocale}" lang="${alternateLocale}" title="${t.switchLanguage.hint}" data-lang-switch>${t.switchLanguage.label}</a>
    </header>
  `;
}

function renderFooter({ locale, now }: RenderContext): SafeHtml {
  return html`<footer class="footer"><p>© ${now.getUTCFullYear()} ${profile.name[locale]}</p></footer>`;
}

export function renderBody(locale: Locale, now = new Date()): string {
  const ctx = createContext(locale, now);
  return html`
    <a class="skip-link" href="#main">${ctx.t.skipLink}</a>
    <div id="top"></div>
    ${renderTopbar(ctx)}
    <main id="main">
      ${renderHero(ctx)}
      ${renderGuide(ctx)}
      ${renderAdvisor(ctx)}
      ${renderContact(ctx)}
    </main>
    ${renderFooter(ctx)}
  `.value;
}
