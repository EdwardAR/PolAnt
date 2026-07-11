# AGENTS.md — Generador de Documentos de Tránsito

## Stack

- **Vanilla HTML, CSS, JavaScript** — no frameworks, no build step, no bundlers.
- **100% client-side.** No backend, no server, no Node.js required.
- **Offline-first.** All dependencies (CSS reset, icon set, PDF lib) must be vendored or loaded from a local `lib/` folder. No CDN references.
- **GitHub Pages.** Publish by pushing to the default branch (`main`). No build or deploy script needed.

## Commands

There is no build tooling. To work on the project:

```bash
# Serve locally (pick one):
npx serve .
python -m http.server 8000
# or open index.html directly via file://
```

## Architecture & Conventions

- `index.html` — entry point, single-page app layout.
- `css/` — all stylesheets.
- `js/` — all JavaScript modules (no ES modules if IE11 compatibility is needed; use ES modules for modern browsers).
- `lib/` — vendored third-party libraries (e.g., jsPDF, html2canvas for PDF export).
- `docs/` — document templates (HTML partials or JSON schemas for each document type).
- `img/` — static assets, logos, croquis placeholders.

## Document Architecture

- Each document type (parte de accidente, acta de infracción, etc.) has a **form definition** (fields + validation rules) and a **template** (HTML with placeholder interpolation).
- Generation: read form → validate → interpolate into template → render preview → print/download PDF.
- Use `window.print()` for print/PDF (native browser dialog). Optionally support jsPDF for programmatic PDF export.

## Style & Quality

- All text in Spanish (Argentina).
- Language must be technical-legal, formal, consistent with transit regulations.
- No external fonts unless self-hosted in `fonts/`.
- Use `<link rel="preconnect">` zero times — everything is local.
- Keep a single `<script>` entry in `index.html` that bootstraps the app.
- Form validation: use native HTML5 validation + manual JS checks.
- No localStorage persistence expected unless explicitly added.

## Constraints

- Must render correctly in Chrome and Firefox (target police department computers).
- Print layout must be clean: `@media print` styles in a dedicated CSS file.
- **Fully responsive** — must work on tablets and mobile (target: police tablets in field). Use `@media` breakpoints for sidebar collapse, font sizing, and form layout.
- Do not use `.innerHTML` with unsanitized user input; prefer `textContent` or template cloning if user data is interpolated.
