export const prompts = [
  // ─── Redacción Jurídica ───────────────────────────────────────
  {
    id: 'redactar-parte-accidente',
    category: 'Redacción Jurídica',
    title: 'Redactar un parte de accidente en lenguaje técnico-legal',
    description: 'Transforma datos crudos de un siniestro vial en un relato formal con terminología jurídica.',
    prompt: `Actuá como un oficial de la Policía de Tránsito especializado en redacción de documentos legales.

Te voy a proporcionar los datos de un accidente de tránsito. Necesito que redactes la sección de "Narración de los hechos" de un parte oficial, cumpliendo con los siguientes requisitos:

CONTEXTO:
- Es un documento oficial que será presentado ante un juzgado de faltas o fiscalía.
- Debe reflejar objetividad absoluta, sin opiniones ni presunciones no verificadas.
- Usá la jerga técnica del derecho de tránsito argentino.

TAREA:
Redactá una narración formal que incluya:
1. Fecha, hora y lugar exacto del hecho.
2. Condiciones ambientales y de visibilidad.
3. Tipo de vía y señalización existente.
4. Descripción cronológica de los hechos desde una perspectiva de tercero objetivo.
5. Acciones de cada interviniente.
6. Consecuencias inmediatas (daños materiales, lesiones).
7. Medidas adoptadas por el personal actuante.

FORMATO DE SALIDA:
- Texto corrido en párrafos formales.
- Sin viñetas ni enumeraciones.
- Extensión: entre 10 y 20 líneas.
- Tono: formal, técnico-jurídico, impersonal.

RESTRICCIONES:
- No uses: "presuntamente", "aparentemente", "quizás" ni términos especulativos.
- No incluyas conclusiones sobre responsabilidad ni culpabilidad.
- No uses lenguaje coloquial ni regionalismos.
- Toda referencia a personas debe incluir el documento de identidad.
- Las referencias a vehículos deben incluir dominio, marca y modelo.

DATOS DEL CASO:
{{datos_caso}}

Escribí únicamente la narración, sin introducción ni comentarios adicionales.`,
  },
  {
    id: 'redactar-acta-infraccion',
    category: 'Redacción Jurídica',
    title: 'Redactar un acta de infracción formal',
    description: 'Convierte una situación de infracción en un acta con fundamento normativo sólido.',
    prompt: `Actuá como un inspector de tránsito con amplia experiencia en labrar actas de infracción.

Te voy a describir una situación de infracción. Necesito que redactes el cuerpo de un acta de infracción con el siguiente formato:

CONTEXTO:
- Destinatario: Juzgado Municipal de Faltas.
- Marco normativo: Ley Nacional de Tránsito 24.449 y leyes provinciales aplicables.
- El acta debe ser impugnable solo en forma, no en fondo.

TAREA:
Redactá el acta incluyendo:
1. Identificación completa del infractor y del vehículo.
2. Lugar, fecha y hora exacta de la comprobación.
3. Descripción objetiva y circunstanciada de la conducta infractora.
4. Artículo/s infringido/s con cita textual parcial del articulado.
5. Tipo de infracción según clasificación reglamentaria.
6. Medida preventiva adoptada (si corresponde).
7. Datos del inspector actuante.
8. Notificaciones realizadas y resultado.

FORMATO DE SALIDA:
- Párrafos numerados (1., 2., 3., etc.).
- Cada hecho con su correspondiente fundamento normativo entre paréntesis.
- Tono: formal, técnico, con precisión jurídica.

RESTRICCIONES:
- Citá los artículos con número y texto parcial obligatoriamente.
- No uses valoraciones subjetivas del comportamiento del infractor.
- Si hay testigos, incluí sus datos completos.
- No asumas intencionalidad.

DATOS DE LA INFRACCIÓN:
{{datos_infraccion}}`,
  },
  {
    id: 'redactar-descargo',
    category: 'Redacción Jurídica',
    title: 'Redactar un descargo o recurso de defensa',
    description: 'Elabora un escrito de descargo formal ante una infracción de tránsito.',
    prompt: `Actuá como un abogado especializado en derecho de tránsito y faltas municipales.

CONTEXTO:
Un ciudadano recibió un acta de infracción de tránsito y desea presentar un descargo formal ante el Juzgado Municipal de Faltas antes del vencimiento del plazo.

TAREA:
Redactá un escrito de descargo que contenga:
1. Encabezado con datos del juzgado, infractor y número de acta.
2. Objeto: presentación de descargo.
3. Hechos: exposición de la versión del infractor.
4. Derecho: fundamentos legales que avalan la posición del descargante.
5. Prueba: ofrecimiento de medios de prueba (testimonial, documental, pericial).
6. Petitorio: solicitud concreta de archivo o sobreseimiento.

FORMATO DE SALIDA:
- Estructura de escrito judicial argentino.
- Párrafos con numeración romana (I, II, III, etc.).
- Extensión máxima: 3 carillas.
- Tono: formal, respetuoso, técnico-jurídico.

RESTRICCIONES:
- No incluyas datos que no hayan sido proporcionados.
- Usá citas normativas precisas (ley, artículo, inciso).
- No ataques al personal actuante ni uses términos despectivos.

DATOS DEL CASO:
{{datos_descargo}}`,
  },

  // ─── Consulta Normativa ───────────────────────────────────────
  {
    id: 'consultar-normativa-aplicable',
    category: 'Consulta Normativa',
    title: 'Consultar normativa aplicable a un caso concreto',
    description: 'Obtén las normas específicas que aplican a una situación de tránsito determinada.',
    prompt: `Actuá como un especialista en legislación de tránsito argentina con conocimiento integral de leyes nacionales y provinciales.

CONTEXTO:
Necesito determinar qué normativa es aplicable a una situación de tránsito específica para fundamentar correctamente un documento oficial.

TAREA:
Analizá el caso que voy a describir y proporcioná:
1. Ley/es aplicable/s (nacional y/o provincial).
2. Artículo/s específico/s con su texto.
3. Jurisprudencia relevante si existe.
4. Interpretación doctrinaria del artículo aplicable.
5. Relación entre normas (si hay concurso de normas, cuál prevalece).

FORMATO DE SALIDA:
- Listado ordenado por jerarquía normativa.
- Cada norma con: ley, artículo, inciso, texto parcial y breve explicación de por qué aplica al caso.
- Incluí el enlace a la fuente oficial cuando sea posible.

RESTRICCIONES:
- Solo legislación argentina vigente.
- Distinguí claramente entre norma nacional y provincial.
- No inventes jurisprudencia; si no conocés, indicá que debe consultarse el digesto judicial correspondiente.
- Si hay más de 5 artículos aplicables, priorizá los 5 más relevantes.

SITUACIÓN:
{{situacion}}`,
  },
  {
    id: 'interpretar-articulo',
    category: 'Consulta Normativa',
    title: 'Interpretar un artículo de la Ley de Tránsito',
    description: 'Obtén una interpretación clara y aplicable de un artículo específico.',
    prompt: `Actuá como un docente de derecho de tránsito con experiencia en la aplicación práctica de la ley.

CONTEXTO:
Soy oficial de tránsito y necesito comprender a fondo un artículo específico de la legislación vial para aplicarlo correctamente en un caso real.

TAREA:
Analizá el artículo que te voy a indicar y desarrollá:
1. Texto completo del artículo.
2. Significado y alcance de cada inciso.
3. Bien jurídico protegido.
4. Elementos que deben configurarse para que se aplique.
5. Excepción/es si existen.
6. Penalidad o consecuencia prevista.
7. Ejemplo práctico de aplicación correcta.
8. Ejemplo práctico de aplicación incorrecta (para contraste).

FORMATO DE SALIDA:
- Explicación didáctica pero con rigor técnico.
- Usá subtítulos para cada punto.
- Lenguaje claro pero sin perder precisión jurídica.
- Extensión: entre 400 y 800 palabras.

RESTRICCIONES:
- No agregues opiniones personales sobre la eficacia o justicia de la norma.
- Distinguí claramente entre lo que dice la ley y lo que interpreta la doctrina.
- Si hay jurisprudencia relevante, mencionala brevemente.

ARTÍCULO A INTERPRETAR:
{{articulo}}`,
  },

  // ─── Procedimiento ────────────────────────────────────────────
  {
    id: 'guia-labrar-acta',
    category: 'Procedimiento',
    title: 'Guía paso a paso para labrar un acta de infracción',
    description: 'Instrucciones detalladas para confeccionar un acta correctamente desde lo procedural.',
    prompt: `Actuá como un instructor de procedimientos de tránsito con vasta experiencia en formación de personal policial.

CONTEXTO:
Un oficial de tránsito necesita una guía clara y completa sobre el procedimiento correcto para labrar un acta de infracción, desde el momento en que detecta la falta hasta la notificación al infractor.

TAREA:
Proporcioná una guía paso a paso que cubra:

FASE 1 - PREVIA (antes de la intercepción):
1. Verificación de condiciones de seguridad.
2. Observación directa y continuada de la infracción.
3. Elementos necesarios (acta, lapicera, dispositivos de medición).

FASE 2 - INTERCEPCIÓN:
1. Señalización de detención reglamentaria.
2. Identificación personal y de la autoridad.
3. Solicitud de documentación del conductor y del vehículo.
4. Comunicación clara de la infracción cometida.

FASE 3 - CONFECCIÓN:
1. Completado de datos del infractor y del vehículo.
2. Descripción detallada de la infracción.
3. Citación de la normativa infringida.
4. Medida preventiva si corresponde.
5. Notificación y entrega de copia.

FASE 4 - POSTERIOR:
1. Remisión del acta al organismo competente.
2. Archivo de la copia de respaldo.
3. Cadena de custodia si hubo secuestro.

FORMATO DE SALIDA:
- Pasos numerados con viñetas para sub-pasos.
- Checklist para que el oficial marque cada paso cumplido.
- Tono: instructivo, claro, directo.

RESTRICCIONES:
- Basado en Ley 24.449 y normas provinciales armonizadas.
- Incluí advertencias sobre errores comunes que invalidan el acta.
- Diferenciá entre procedimiento en zona urbana y en ruta.`,
  },
  {
    id: 'consejos-narracion-accidente',
    category: 'Procedimiento',
    title: 'Consejos para la descripción técnica de un accidente',
    description: 'Guía para redactar una descripción pericial de un siniestro vial.',
    prompt: `Actuá como un perito en accidentología vial con experiencia en reconstrucción de siniestros.

CONTEXTO:
Un oficial de tránsito debe redactar la descripción de un accidente para el parte oficial. Necesita lineamientos precisos para que la narración tenga valor probatorio y pueda ser utilizada en un peritaje posterior.

TAREA:
Proporcioná una guía técnica para describir accidentes de tránsito, cubriendo:

1. ELEMENTOS ESENCIALES que no pueden faltar en toda descripción:
   - Posición final de los vehículos (referencias fijas).
   - Trayectorias previas al impacto.
   - Punto de impacto.
   - Huellas, rastros y vestigios.

2. VOCABULARIO TÉCNICO:
   - Términos correctos para cada tipo de impacto.
   - Clasificación de colisiones.
   - Terminología de daños.

3. ERRORES FRECUENTES:
   - Descripciones subjetivas.
   - Omisión de distancias y referencias.
   - Confusión entre causa y consecuencia.

4. ESQUEMA DE REDACCIÓN RECOMENDADO:
   - Estructura en 7 párrafos tipo.
   - Qué incluir en cada párrafo.
   - Ejemplo de descripción modelo.

FORMATO DE SALIDA:
- Guía práctica con ejemplos concretos.
- Tablas comparativas de terminología correcta vs. incorrecta.
- Tono: técnico pero accesible.

RESTRICCIONES:
- Basado en la metodología de reconstrucción de accidentes.
- Enfocado en el valor probatorio del documento.
- Incluí referencias a la normativa sobre prueba documental.`,
  },

  // ─── Revisión y Corrección ────────────────────────────────────
  {
    id: 'revisar-texto-juridico',
    category: 'Revisión y Corrección',
    title: 'Revisar y corregir un texto jurídico',
    description: 'Corrige errores de forma, estilo y fondo en un documento de tránsito.',
    prompt: `Actuá como un corrector de textos jurídicos especializado en documentación de tránsito y faltas.

CONTEXTO:
Te voy a pasar un borrador de documento oficial de tránsito (parte, acta, informe, etc.) que necesita revisión antes de ser presentado formalmente.

TAREA:
Revisá el texto y proporcioná:
1. Correcciones de forma: ortografía, gramática, puntuación y sintaxis.
2. Correcciones de estilo: adecuación al lenguaje técnico-jurídico formal.
3. Correcciones de fondo: precisión normativa, consistencia interna, completitud de datos.
4. Versión corregida completa del texto.
5. Resumen de cambios realizados (qué se corrigió y por qué).

FORMATO DE SALIDA:
- Tabla con 4 columnas: N° | Tipo de error | Texto original | Corrección propuesta.
- Al final: texto completo corregido.
- Tono de los comentarios: constructivo y profesional.

RESTRICCIONES:
- No modifiques datos fácticos ni fechas.
- Si hay imprecisiones normativas, indicá la corrección pero no inventes artículos.
- Mantené el sentido original del texto.
- Si el texto es correcto, indicá que no requiere modificaciones.

TEXTO A REVISAR:
{{texto}}`,
  },
  {
    id: 'convertir-lenguaje-coloquial',
    category: 'Revisión y Corrección',
    title: 'Convertir lenguaje coloquial a técnico-legal',
    description: 'Transforma declaraciones informales en lenguaje jurídico formal.',
    prompt: `Actuá como un traductor jurídico especializado en convertir lenguaje coloquial en texto técnico-legal propio de documentos de tránsito.

CONTEXTO:
Un testigo o interviniente en un accidente de tránsito hizo una declaración en lenguaje coloquial. Necesito convertir esa declaración en un texto formal que pueda incluirse como testimonio en un parte oficial.

TAREA:
Tomá el texto coloquial que te voy a proporcionar y:
1. Traducilo a lenguaje formal técnico-jurídico.
2. Preservá íntegramente los hechos y datos objetivos.
3. Eliminá muletillas, expresiones emocionales y valoraciones subjetivas.
4. Estructurá cronológicamente los hechos.
5. Agregá la terminología técnica adecuada para describir acciones, maniobras y elementos viales.

FORMATO DE SALIDA:
- Versión convertida en texto corrido (3 a 8 párrafos).
- Versión en viñetas con los hechos escenciales (opcional).
- Breve nota explicando los cambios más significativos.

RESTRICCIONES:
- No alteres ni agregues hechos no mencionados por el declarante.
- Mantené la primera persona si es una declaración testimonial.
- No elimines datos que parezcan irrelevantes (pueden ser útiles en la investigación).

TEXTO COLOQUIAL ORIGINAL:
{{texto_coloquial}}`,
  },
  {
    id: 'formalizar-descripcion-danos',
    category: 'Revisión y Corrección',
    title: 'Descripción formal de daños y lesiones',
    description: 'Redacta la descripción técnica de daños materiales y lesiones corporales.',
    prompt: `Actuá como un tasador de daños y perito en siniestros viales con experiencia en documentación forense.

CONTEXTO:
Necesito redactar la sección de daños y lesiones de un parte de accidente con precisión técnica para que tenga validez como prueba documental.

TAREA:
Basándote en los datos que te voy a proporcionar, redactá:

A) DAÑOS MATERIALES por vehículo:
   - Descripción detallada de cada pieza dañada.
   - Tipo de daño (abolladura, fractura, fisura, desprendimiento, etc.).
   - Localización en el vehículo (delantero, lateral derecho, etc.).
   - Extensión aproximada del daño.
   - Relación con el punto de impacto.

B) LESIONES (si hubo):
   - Tipo de lesión (excoriación, fractura, contusión, etc.).
   - Región corporal afectada.
   - Gravedad aparente (leve, moderada, grave).
   - Atención médica recibida.
   - Derivación si corresponde.

FORMATO DE SALIDA:
- Listado tabular para daños (vehículo | pieza | tipo de daño | localización).
- Listado tabular para lesiones (persona | lesión | región | gravedad).
- Texto narrativo complementario al pie.

RESTRICCIONES:
- Usá nomenclatura técnica de la industria automotriz y médica.
- No diagnostiques ni emitas opiniones sobre pronóstico.
- Diferenciá claramente entre daños observados y daños denunciados.
- Incluí la metodología de inspección utilizada.

DATOS:
{{datos_danos}}`,
  },
];
