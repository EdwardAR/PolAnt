# PolAnt — Generador de Documentos de Tránsito (Perú)

Herramienta web 100% client-side para la **Policía Nacional del Perú - División de Tránsito** que permite confeccionar documentos oficiales de tránsito: **Partes de Accidente** y **Actas de Infracción**, además de contar con un asistente de **prompts para IA** orientados a la redacción jurídica y consultas normativas.

## Demo

[https://edwardar.github.io/PolAnt/](https://edwardar.github.io/PolAnt/)

## Características

- **Generación de documentos oficiales** con datos estructurados (vehículos, conductores, testigos, autoridades).
- **Vista previa** con formato listo para impresión A4.
- **Exportación a Word (.doc)** para edición posterior.
- **Impresión directa** con estilo limpio y profesional.
- **Asistente de Prompts para IA** — más de 15 prompts estructurados para usar con ChatGPT, DeepSeek o Gemini.
- **Buscador de prompts** en tiempo real.
- **Normativa peruana integrada** — Ley 27181, Reglamento Nacional de Tránsito (DS 016-2009-MTC), Código Civil y Penal.
- **100% offline** — sin dependencias externas, sin CDN, sin backend.
- **Responsive** — funciona en desktop, tablets y móviles.
- **Sin frameworks** — HTML, CSS y JavaScript vanilla.

## Stack

- **Vanilla HTML, CSS, JavaScript** — sin frameworks, sin build steps, sin npm.
- **100% client-side** — sin backend, sin servidor, sin Node.js.
- **Offline-first** — todas las dependencias incluidas en `lib/`.
- **GitHub Pages** — deploy automático al pushear a `main`.

## Uso

1. **Seleccioná un documento** en el panel lateral (Parte de Accidente o Acta de Infracción).
2. **Completá el formulario** con los datos del caso.
3. **Generá el documento** con el botón "Generar Documento" o `Ctrl+Enter`.
4. **Previsualizá**, imprimí o descargá en Word.

Para usar los prompts con IA:
1. Seleccioná **"Prompts para IA"** en el sidebar.
2. Elegí una categoría (Redacción Jurídica, Consulta Normativa, etc.).
3. Copiá el prompt y pegalo en ChatGPT, DeepSeek o Gemini.

## Desarrollo Local

```bash
# Opción 1 (recomendada en Windows):
python server.py

# Opción 2:
npx serve .

# NO USAR: python -m http.server 8000 (no funciona en Windows)
```

## Estructura del Proyecto

```
├── index.html              # Entry point
├── server.py               # Dev server local (MIME types correctos)
├── css/
│   ├── style.css           # Estilos principales
│   └── print.css           # Estilos de impresión
├── js/
│   ├── app.js              # Lógica principal
│   ├── form-engine.js      # Motor de formularios
│   ├── template-engine.js  # Motor de plantillas {{key}}
│   └── icons.js            # Iconos SVG inline
├── docs/
│   ├── normativa.js        # Artículos legales (Perú)
│   ├── prompts.js          # Prompts para IA
│   ├── parte-accidente.js  # Definición Parte de Accidente
│   └── acta-infraccion.js  # Definición Acta de Infracción
├── lib/
│   └── reset.css           # CSS reset
└── img/                    # Imágenes y logos
```

## Normativa Peruana Aplicada

- **Ley 27181** — Ley General de Transporte y Tránsito Terrestre
- **DS 016-2009-MTC** — Reglamento Nacional de Tránsito (RNT)
- **DS 058-2003-MTC** — Reglamento Nacional de Vehículos (RNV)
- **Código Civil Peruano** — Responsabilidad civil (Art. 1969, 1970, 1981, 1985)
- **Código Penal Peruano** — Delitos de tránsito (Art. 111, 124, 274)

## Atajos de Teclado

| Tecla | Acción |
|---|---|
| `Ctrl + Enter` | Generar documento |
| `Escape` | Volver al formulario |

## Contribuir

1. Crear un nuevo documento en `docs/` siguiendo el schema de definición.
2. Agregar el `<script>` correspondiente en `index.html`.
3. Registrar el documento con `registerDocument()` en `app.js`.
4. El sidebar se actualiza automáticamente.

## Licencia

Uso interno para la Policía Nacional del Perú — División de Tránsito.
