# Abdulrahman Asiri — Portfolio

Bilingual portfolio of a technical support engineer. Arabic (RTL) is served at `/`, English (LTR) at `/en/`.

**Live:** https://abdulrhmnasiri.github.io/abdul-main/

It presents two projects, each as an interactive demonstration instead of a case study:

- **User Guide** (production): an in-app MkDocs guide, recreated as a phone with placeholder content. Its assistant, support form and navigation work inside the demo. The original is an internal client project and is not published.
- **Career Advisor** (research and development): a phone that replays a recorded advisor response from a pilot run and lets the visitor confirm, edit or reject the proposed wording, plus a gate showing how example statements are stored or stopped. It is labelled as a recorded example, not a live service.

Technical decisions, technologies and skills sit in collapsed rows under each project.

## Stack

TypeScript (strict), Vite and Vitest. No UI framework and no runtime dependencies.

Both pages are pre-rendered at build time from typed content in `src/content`, so they are complete HTML without JavaScript. The client script only adds interaction. Each translatable value is typed `Localized<T>`, so a missing translation fails the typecheck.

## Run locally

Requires Node.js 20.19+ (or 22.12+).

```bash
npm install
npm run dev     # http://localhost:5173 (Arabic) and /en/ (English)
```

## Validate

```bash
npm run check
```

This runs the typecheck, the test suite, a production build, and `scripts/check-dist.mjs`, which verifies that every link, asset, anchor, manifest icon and sitemap URL in `dist/` resolves. The tests cover content integrity, rendered-page invariants, form validation and a confidentiality guard.

## Deploy

`.github/workflows/ci.yml` runs the same checks on every push and pull request, and deploys `dist/` to GitHub Pages from `main`. In the repository settings, Pages must use **Source: GitHub Actions**.

All asset URLs are relative, so the build works under the `/abdul-main/` project path without extra configuration. `public/research.html` and `public/operations-knowledge-center.html` forward the site's earlier URLs to their new sections.

`siteUrl` in `src/content/profile.ts` must match the deployed URL. It drives the canonical, `hreflang` and Open Graph tags. To link a public demo, set `advisor.demoUrl` in `src/content/work.ts`.

## Structure

```
src/content/   Typed, bilingual content: profile, projects, UI strings
src/render/    Build-time page renderers, one module per section
src/client/    Interaction: phones, gate, collapsible rows, form, navigation
src/lib/       Escaping HTML templates, gate state
src/styles/    Tokens, base, layout and per-section CSS
public/        Copied as-is: CV, icons, social preview, sitemap, redirects
scripts/       Built-output validation
tests/         Vitest suites
```

## Notes

- The contact form posts to Web3Forms. The hCaptcha script loads only when the form is opened.
- `public/service-worker.js` retires the offline worker installed by earlier versions of the site. It removes only this site's caches, because all GitHub Pages projects of an account share one origin. It can be deleted after a few months.
