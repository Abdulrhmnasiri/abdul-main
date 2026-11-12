import { profile } from '../content/profile.ts';
import { statusRows } from '../content/status.ts';
import { html, type SafeHtml } from '../lib/html.ts';
import type { RenderContext } from './context.ts';

export function renderHero({ locale, t }: RenderContext): SafeHtml {
  const dot = html`<span aria-hidden="true"> · </span>`;
  return html`
    <section class="hero" aria-labelledby="hero-name">
      <div class="hero-id">
        <img class="portrait" src="/src/assets/portrait.webp" width="160" height="160" alt="" fetchpriority="high" />
        <p class="hero-role">
          <span class="hero-role-main">${t.hero.role}</span>
          <span class="hero-role-alt">${t.hero.roleAlt}</span>
          <span class="hero-meta">${t.hero.years}${dot}${t.hero.place}</span>
        </p>
      </div>
      <h1 id="hero-name">${profile.name[locale]}</h1>
      <p class="hero-line">${t.hero.line}</p>

      <nav class="status" aria-labelledby="hero-index">
        <p class="status-head" id="hero-index"><span class="status-pulse" aria-hidden="true"></span>${t.hero.index}</p>
        <ul>
          ${statusRows.map(
            (row, i) => html`
              <li style="--i:${i}">
                <a href="${row.href}">
                  <span class="status-dot" data-state="${row.state}" aria-hidden="true"></span>
                  <span class="status-text">
                    <span class="status-label">${row.label[locale]}</span>
                    <span class="status-value">${row.value[locale]}</span>
                  </span>
                </a>
              </li>
            `,
          )}
        </ul>
      </nav>
    </section>
  `;
}
