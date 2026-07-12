# AGENTS.md — PolAnt: Generador de Documentos de Tránsito (Perú)

## Stack

- **Vanilla HTML, CSS, JavaScript** — no frameworks, no build step, no bundlers, no npm.
- **100% client-side.** No backend, no server, no Node.js required.
- **Offline-first.** All dependencies must be vendored in `lib/`. No CDN references ever.
- **GitHub Pages.** Deploy by pushing to `main`. No build or deploy script needed.
- **Normativa peruana.** Basado en Ley 27181 (Ley General de Transporte y Tránsito Terrestre) y Reglamento Nacional de Tránsito (DS 016-2009-MTC).
- **Script loading order matters** — files are loaded via plain `<script>` tags in `index.html`; they share the global scope. Load order is: `normativa.js` → `prompts.js` → document definitions → `icons.js` → `template-engine.js` → `form-engine.js` → `app.js`.

## Commands

No build tooling. To work on the project:

```bash
# Serve locally (pick one):
python server.py           # preferred on Windows (sets correct MIME types)
npx serve .
```

> Nota: `python -m http.server 8000` NO funciona en Windows porque sirve archivos .js como text/plain, lo que bloquea la carga de scripts en el navegador. Siempre usar server.py o npx serve.

## File Structure

```
index.html              # Entry point — SPA layout, all <script> tags here
server.py               # Local dev server (requerido en Windows para MIME types correctos)
css/
  style.css             # All app styles, CSS custom properties (vars)
  print.css             # @media print rules only (loaded with media="print")
js/
  icons.js              # Global `icons` object — inline SVG strings keyed by name
  template-engine.js    # TemplateEngine class — {{key}} interpolation
  form-engine.js        # FormEngine class — renders, validates, reads forms
  app.js                # Main app logic — routing, event listeners, document registry, prompt search
docs/
  normativa.js          # Global `normativa` object — legal articles for checkboxes (Perú)
  prompts.js            # Global `prompts` array — AI prompt templates (Perú)
  parte-accidente.js    # `parteAccidente` document definition (Perú)
  acta-infraccion.js    # `actaInfraccion` document definition (Perú)
lib/
  reset.css             # Vendored CSS reset
img/                    # Static assets (logos, icons, og-image, bg pattern)
```

## Architecture

### Global Namespace

All JS files use the global scope (no ES modules). Variables declared with `const`/`let` at the top level are accessible everywhere:

| Global | Defined in | Type |
|---|---|---|
| `icons` | `js/icons.js` | Object — SVG strings by icon name |
| `normativa` | `docs/normativa.js` | Object — legal article tree (Perú) |
| `prompts` | `docs/prompts.js` | Array — AI prompt objects (Perú) |
| `parteAccidente` | `docs/parte-accidente.js` | Document definition object (Perú) |
| `actaInfraccion` | `docs/acta-infraccion.js` | Document definition object (Perú) |
| `FormEngine` | `js/form-engine.js` | Class |
| `TemplateEngine` | `js/template-engine.js` | Class |

### Document Definition Schema

Each document (in `docs/`) is a plain object:

```js
const myDoc = {
  id: 'my-doc',          // kebab-case, unique
  title: 'My Document',  // shown in sidebar and preview header
  sections: [{           // array of section objects
    title: 'Section Title',   // shown as h3
    icon: 'calendar',         // key from icons object (optional)
    fields: [{ name: 'fieldName', label: 'Display Label', type: 'text|date|time|select|textarea|normativa',
      required: true, placeholder: '...', rows: 5, autocomplete: 'name',
      options: ['A', 'B'],  // for select: strings or {value, label} objects
      visibleWhen: { field: 'otherField', value: 'someValue' }  // conditional visibility
    }]
  }],
  template: `<div>{{fieldName}}</div>`, // Option A: use TemplateEngine {{key}} interpolation
  // Option B: custom generate function
  generate(data) { return `<div>${data.fieldName}</div>`; }
};
```

To register a new document: add its `<script>` in `index.html` before `app.js`, then call `registerDocument(myDoc)` in `app.js`.

### Special Field Type: `normativa`

Fields with `type: 'normativa'` render the legal article tree from `normativa.js` (Perú) as a checkbox list, plus a free-text input for unlisted articles.

### Conditional Fields

`visibleWhen: { field: 'X', value: 'Y' }` hides a field until field `X` equals value `Y`. Hidden fields return `''` in `getFormValues()`. The `FormEngine._setupConditionalFields()` method wires this automatically.

### Preview & Export

- **Preview**: `previewContent.innerHTML = html`
- **Print/PDF**: `window.print()` — `print.css` hides everything except `#preview-content`
- **Word download**: wraps preview HTML in a Word-compatible envelope and triggers a `.doc` Blob download

### View States

The app toggles exactly one of these at a time by adding/removing `hidden` class:

- `#welcome` — initial state
- `#form-view` — fill out a document form
- `#preview-view` — rendered document preview
- `#prompts-view` — AI prompt browser

## Adding a New Document Type

1. Create `docs/my-document.js` following the schema above.
2. Add `<script src="docs/my-document.js"></script>` in `index.html` before `app.js`.
3. Call `registerDocument(myDocument)` in `app.js`.
4. The sidebar auto-populates, sorted by title.

## Adding a New Icon

Add a new key to the `icons` object in `js/icons.js`. Value must be an inline SVG string.

## Adding AI Prompts

Add a new object to the `prompts` array in `docs/prompts.js`:

```js
{
  id: 'unique-id',
  category: 'Redacción Jurídica',
  title: 'Prompt title',
  description: 'Short description',
  prompt: `Full prompt text...`
}
```

Existing categories: `'Redacción Jurídica'`, `'Consulta Normativa'`, `'Procedimiento'`, `'Revisión y Corrección'`.

## Updating Legal Articles (normativa.js)

`normativa.js` exports a `normativa` object with `leyes[]` → `categorias[]` → `articulos[]`. Each article: `{ ref: 'RNT Art. 275', desc: 'Description' }`. The `ref` string is what gets saved into form data.

## CSS Conventions

- CSS custom properties defined in `:root` in `style.css` — always use vars for colors, spacing, border-radius.
- Key vars: `--color-primary: #1a3a5c`, `--color-accent: #c0392b`, `--sidebar-width: 272px`, `--header-height: 64px`.
- `print.css` is loaded with `media="print"` — only add print-specific overrides there.
- Use `.hidden` class to toggle visibility, not inline `display:none`.
- `.no-print` class hides elements in print (e.g., the BORRADOR watermark).

## Style & Quality Rules

- All UI text in **Spanish (Perú)** — formal, technical-legal register.
- Normativa peruana: Ley 27181, Reglamento Nacional de Tránsito (DS 016-2009-MTC), Reglamento Nacional de Vehículos.
- Use `Placa` instead of `Patente`/`Dominio`; `SOAT` instead of `Seguro Obligatorio`.
- Never use `.innerHTML` with unsanitized user input; prefer `textContent` or DOM construction.
- Form validation: native `required` + `checkValidity()` in `FormEngine.validateForm()`.
- No `localStorage` persistence unless explicitly added.
- No external fonts — system font stack only: `"Segoe UI", system-ui, -apple-system, Arial, sans-serif`.
- No CDN URLs anywhere.

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl+Enter` | Generate document (when form is open) |
| `Escape` | Back to form (when preview is open) |

## Deployment

Push to `main` branch on GitHub. GitHub Pages serves `index.html` directly — no build needed.
Live URL: `https://edwardar.github.io/PolAnt/`

## Constraints

- Must render in Chrome and Firefox (police department computers).
- Must work on tablets and mobile (police field tablets) — fully responsive with sidebar collapse.
- Print output must be clean A4 — all styles in `@media print` in `print.css`.
- No IE11 support required.
