# Abdulrahman Asiri — Portfolio

Personal portfolio site: a bilingual (Arabic/English), founder-identity homepage plus two linked project write-ups — an applied engineering research page and an operational case study.

**Live site:** https://abdulrhmnasiri.github.io/abdul-main/

## Technologies

- Static HTML, CSS, and vanilla JavaScript (native ES Modules) — no build step, bundler, or framework
- A Service Worker for offline-friendly PWA caching
- [Web3Forms](https://web3forms.com) for contact-form delivery, protected with hCaptcha

## Public pages

- `index.html` — the homepage: profile, working methodology, professional background, two linked project entries, and a contact form
- `operations-knowledge-center.html` — case study on an embedded operational knowledge and support center
- `research.html` — applied engineering research on verification boundaries in assistance systems

## Running locally

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`. The site must be served over HTTP (not opened as a `file://` path) since ES Modules and the Service Worker both require it.

## Accessibility and language

The interface is Arabic-first with a full English toggle, switching text direction (RTL/LTR) accordingly. Interactive elements expose accessible labels and visible focus states, and the layout is responsive across desktop and mobile breakpoints.

## Contact

Reach out through the contact form on the live site above.
