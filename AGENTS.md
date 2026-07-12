# AGENTS.md — PolAnt: Generador de Documentos de Tránsito

## Stack

- **Vanilla HTML, CSS, JavaScript** — no frameworks, no build step, no bundlers, no npm.
- **100% client-side.** No backend, no server, no Node.js required.
- **Offline-first.** All dependencies must be vendored in `lib/`. No CDN references ever.
- **GitHub Pages.** Deploy by pushing to `main`. No build or deploy script needed.
- **Script loading order matters** — files are loaded via plain `<script>` tags in `index.html`; they share the global scope. Load order is: `normativa.js` → `prompts.js` → document definitions → `icons.js` → `template-engine.js` → `form-engine.js` → `app.js`.

## Commands

No build tooling. To work on the project:

```bash
# Serve locally (pick one):
python server.py           # preferred on Windows
npx serve .

# CRITICAL: python -m http.server 8000 does NOT work on Windows
# (serves .js as text/plain, which blocks script loading in browsers).
# Always use server.py or npx serve.
```

## File Structure

```
index.html              # Entry point — SPA layout, all <script> tags here
server.py               # Local dev server (fixes MIME types)
css/
  style.css             # All app styles, CSS custom properties (vars)
  print.css             # @media print rules only (loaded with media="print")
js/
  icons.js              # Global `icons` object — inline SVG strings keyed by name
  template-engine.js    # TemplateEngine class — {{key}} interpolation
  form-engine.js        # FormEngine class — renders, validates, reads forms
  app.js                # Main app logic — routing, event listeners, document registry
docs/
  normativa.js          # Global `normativa` object — legal articles for checkboxes
  prompts.js            # Global `prompts` array — AI prompt templates
  parte-accidente.js    # `parteAccidente` document definition
  acta-infraccion.js    # `actaInfraccion` document definition
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
| `normativa` | `docs/normativa.js` | Object — legal article tree |
| `prompts` | `docs/prompts.js` | Array — AI prompt objects |
| `parteAccidente` | `docs/parte-accidente.js` | Document definition object |
| `actaInfraccion` | `docs/acta-infraccion.js` | Document definition object |
| `FormEngine` | `js/form-engine.js` | Class |
| `TemplateEngine` | `js/template-engine.js` | Class |

### Document Definition Schema

Each document (in `docs/`) is a plain object with this shape:

```js
const myDoc = {
  id: 'my-doc',          // kebab-case, unique
  title: 'My Document',  // shown in sidebar and preview header
  sections: [            // array of section objects
    {
      title: 'Section Title',   // shown as h3
      icon: 'calendar',         // key from icons object (optional)
      fields: [                 // array of field objects
        {
          name: 'fieldName',      // camelCase, used as data key and input id ("field-fieldName")
          label: 'Display Label',
          type: 'text|date|time|select|textarea|normativa',
          required: true,         // optional boolean
          placeholder: '...',     // optional
          rows: 5,                // for textarea only
          autocomplete: 'name',   // optional HTML autocomplete hint
          options: ['A', 'B'],    // for select: strings or {value, label} objects
          visibleWhen: { field: 'otherField', value: 'someValue' }  // conditional visibility
        }
      ]
    }
  ],
  // Option A: use TemplateEngine {{key}} interpolation
  template: `<div>{{fieldName}}</div>`,

  // Option B: custom generate function (used when logic/formatting is complex)
  generate(data) {
    return `<div>${data.fieldName}</div>`;  // must return HTML string
  }
};
```

To register a new document: add its `<script>` in `index.html` before `app.js`, then call `registerDocument(myDoc)` in `app.js`.

### Special Field Type: `normativa`

Fields with `type: 'normativa'` render the entire legal article tree from `normativa.js` as a checkbox list, plus a free-text input for unlisted articles. The `getFormValues()` method collects checked refs and joins them with `; `.

### Conditional Fields

`visibleWhen: { field: 'X', value: 'Y' }` hides a field until field `X` equals value `Y`. Hidden fields return `''` in `getFormValues()`. The `FormEngine._setupConditionalFields()` method wires this automatically.

### Preview & Export

- **Preview**: `previewContent.innerHTML = html` — the generated HTML string is injected directly. All template output is self-contained with inline styles (no class dependencies).
- **Print/PDF**: `window.print()` — `print.css` hides everything except `#preview-content`.
- **Word download**: wraps preview HTML in a Word-compatible HTML envelope and triggers a `.doc` Blob download.

### View States

The app toggles exactly one of these at a time by adding/removing `hidden` class:

- `#welcome` — initial state
- `#form-view` — fill out a document form
- `#preview-view` — rendered document preview
- `#prompts-view` — AI prompt browser

## Adding a New Document Type

1. Create `docs/my-document.js` following the document definition schema above.
2. Add `<script src="docs/my-document.js"></script>` in `index.html` before `app.js`.
3. Call `registerDocument(myDocument)` in `app.js` (alongside the other `registerDocument` calls).
4. The sidebar will auto-populate with the new document, sorted alphabetically by title.

## Adding a New Icon

Add a new key to the `icons` object in `js/icons.js`. Value must be an inline SVG string (`viewBox="0 0 24 24"`, stroke-based, `width="24" height="24"`). Reference it by key in section `icon` fields.

## Adding AI Prompts

Add a new object to the `prompts` array in `docs/prompts.js`:

```js
{
  id: 'unique-id',
  category: 'Redacción Jurídica',  // one of the 4 existing categories
  title: 'Prompt title',
  description: 'Short description shown on the card',
  prompt: `Full prompt text...`
}
```

Existing categories: `'Redacción Jurídica'`, `'Consulta Normativa'`, `'Procedimiento'`, `'Revisión y Corrección'`.

## Updating Legal Articles (normativa.js)

`normativa.js` exports a `normativa` object with `leyes[]` → `categorias[]` → `articulos[]`. Each article: `{ ref: 'Ley X Art. Y', desc: 'Description' }`. The `ref` string is what gets saved into form data.

## CSS Conventions

- CSS custom properties defined in `:root` in `style.css` — always use vars for colors, spacing, border-radius.
- Key vars: `--color-primary: #1a3a5c`, `--color-accent: #c0392b`, `--sidebar-width: 260px`, `--header-height: 60px`.
- `print.css` is loaded with `media="print"` — only add print-specific overrides there.
- Use `.hidden` class (defined in `style.css`) to toggle visibility, not inline `display:none`.
- `.no-print` class hides elements in print (e.g., the BORRADOR watermark).

## Style & Quality Rules

- All UI text in **Spanish (Argentina)** — formal, technical-legal register.
- Never use `.innerHTML` with unsanitized user input; prefer `textContent` or DOM construction.
- Form validation: native `required` + `checkValidity()` in `FormEngine.validateForm()`. Errors add `.field-invalid` class.
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
