const prompts = [
  // ─── Redacción Jurídica ───────────────────────────────────────
  {
    id: 'redactar-parte-accidente',
    category: 'Redacción Jurídica',
    title: 'Redactar un parte de accidente en lenguaje técnico-legal',
    description: 'Transforma datos crudos de un siniestro vial en un relato formal con terminología jurídica.',
    prompt: `Actuá como un efectivo de la Policía Nacional del Perú - División de Tránsito especializado en redacción de documentos legales.

Te voy a proporcionar los datos de un accidente de tránsito. Necesito que redactes la sección de "Narración de los hechos" de un parte oficial, cumpliendo con los siguientes requisitos:

CONTEXTO:
- Es un documento oficial que será presentado ante un Juzgado de Tránsito o fiscalía.
- Debe reflejar objetividad absoluta, sin opiniones ni presunciones no verificadas.
- Usá la jerga técnica del derecho de tránsito peruano.

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
    prompt: `Actuá como un efectivo de la PNP - División de Tránsito con amplia experiencia en labrar actas de infracción.

Te voy a describir una situación de infracción. Necesito que redactes el cuerpo de un acta de infracción con el siguiente formato:

CONTEXTO:
- Destinatario: Juzgado de Tránsito / Fiscalía de Tránsito.
- Marco normativo: Ley General de Transporte (Ley 27181) y Reglamento Nacional de Tránsito.
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
    prompt: `Actuá como un abogado especializado en derecho de tránsito peruano.

CONTEXTO:
Un ciudadano recibió un acta de infracción de tránsito y desea presentar un descargo formal ante el Juzgado de Tránsito / Fiscalía de Tránsito antes del vencimiento del plazo.

TAREA:
Redactá un escrito de descargo que contenga:
1. Encabezado con datos del juzgado, infractor y número de acta.
2. Objeto: presentación de descargo.
3. Hechos: exposición de la versión del infractor.
4. Derecho: fundamentos legales que avalan la posición del descargante.
5. Prueba: ofrecimiento de medios de prueba (testimonial, documental, pericial).
6. Petitorio: solicitud concreta de archivo o sobreseimiento.

FORMATO DE SALIDA:
- Estructura de escrito judicial peruano.
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
  {
    id: 'redactar-informe-accidente-multiple',
    category: 'Redacción Jurídica',
    title: 'Redactar informe de accidente múltiple',
    description: 'Redacta un informe técnico-legal para siniestros con tres o más vehículos intervinientes.',
    prompt: `Actuá como un efectivo de la Policía Nacional del Perú - División de Tránsito especializado en reconstrucción de accidentes múltiples.

CONTEXTO:
Se produjo un accidente de tránsito con tres o más vehículos intervinientes. Necesito redactar un informe detallado que refleje la complejidad del siniestro y sirva como elemento de prueba en sede judicial.

TAREA:
Redactá un informe técnico-legal que incluya:
1. Identificación completa de cada vehículo interviniente (V1, V2, V3...).
2. Trayectoria previa de cada vehículo.
3. Secuencia cronológica de los impactos.
4. Punto de impacto inicial y puntos de impacto secundarios.
5. Posición final de cada vehículo con referencias fijas.
6. Daños materiales por vehículo.
7. Lesiones por vehículo/ocupante.
8. Croquis descriptivo en texto.

FORMATO DE SALIDA:
- Encabezado con datos del caso.
- Cada vehículo identificado como V1, V2, V3...
- Narración cronológica en párrafos formales numerados.
- Tono: técnico-jurídico, objetivo, apto para peritaje.

RESTRICCIONES:
- No atribuyas responsabilidades ni culpas.
- Usá referencias fijas para ubicaciones (distancia a esquinas, marcas viales).
- Incluí condiciones de visibilidad y estado de la calzada.
- Diferenciá impactos primarios de secundarios.

DATOS DEL ACCIDENTE MÚLTIPLE:
{{datos_accidente}}`,
  },
  {
    id: 'redactar-oficio-judicial',
    category: 'Redacción Jurídica',
    title: 'Redactar un oficio judicial',
    description: 'Elabora un oficio para remitir documentación a un juzgado o fiscalía.',
    prompt: `Actuá como un oficial de tránsito con experiencia en comunicación con órganos judiciales.

CONTEXTO:
Necesito redactar un oficio dirigido a un Juzgado de Tránsito o Fiscalía para remitir un parte de accidente, acta de infracción u otra documentación oficial.

TAREA:
Redactá un oficio formal que contenga:
1. Encabezado con identificación del juzgado/fiscalía destinataria.
2. Número de oficio y fecha.
3. Remitente (dependencia policial, dirección, datos de contacto).
4. Asunto: remisión de documentación.
5. Cuerpo: detalle de la documentación que se adjunta.
6. Fundamentación normativa de la remisión.
7. Petitorio: solicitud de trámite o resolución.
8. Firma y aclaración del jefe de dependencia.

FORMATO DE SALIDA:
- Estructura de oficio judicial peruano.
- Párrafos formales numerados.
- Tono: respetuoso, formal, técnico-jurídico.

RESTRICCIONES:
- Incluí el número de actuaciones y carátula si se proporcionan.
- Usé el tratamiento "Señor/a Juez/a" o "Señor/a Fiscal" según corresponda.
- No incluyas opiniones personales sobre el caso.

DATOS DEL OFICIO:
{{datos_oficio}}`,
  },
  {
    id: 'redactar-informe-tecnico-vehicular',
    category: 'Redacción Jurídica',
    title: 'Redactar un informe técnico vehicular',
    description: 'Documenta el estado mecánico y de seguridad de un vehículo involucrado en un siniestro.',
    prompt: `Actuá como un perito mecánico y accidentólogo vial.

CONTEXTO:
Se requiere un informe técnico detallado sobre el estado de un vehículo involucrado en un siniestro vial, para ser adjuntado al parte oficial como prueba documental.

TAREA:
Redactá un informe técnico vehicular que incluya:
1. Identificación del vehículo (dominio, marca, modelo, año, tipo).
2. Sistema de frenos: estado y funcionamiento.
3. Sistema de dirección: estado y funcionamiento.
4. Sistema de suspensión: estado y funcionamiento.
5. Neumáticos: marca, estado, presión.
6. Sistema de iluminación: funcionamiento de luces.
7. Parabrisas y espejos: estado.
8. Daños constatados: descripción detallada por zona.
9. Conclusiones técnicas sobre la incidencia de cada sistema en el siniestro.

FORMATO DE SALIDA:
- Informe estructurado con subtítulos.
- Tabla de verificación de sistemas (sistema | estado | observaciones).
- Tono: técnico, objetivo, con vocabulario de la industria automotriz.

RESTRICCIONES:
- No emitas conclusiones sobre responsabilidad.
- Diferenciá entre daños preexistentes y daños del siniestro.
- Usá terminología técnica precisa.

DATOS DEL VEHÍCULO:
{{datos_vehiculo}}`,
  },
  {
    id: 'consultar-normativa-aplicable',
    category: 'Consulta Normativa',
    title: 'Consultar normativa aplicable a un caso concreto',
    description: 'Obtén las normas específicas que aplican a una situación de tránsito determinada.',
    prompt: `Actuá como un especialista en legislación de tránsito peruana con conocimiento integral de leyes nacionales y provinciales.

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
- Solo legislación peruana vigente.
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
    prompt: `Actuá como un docente de derecho de tránsito peruano con experiencia en la aplicación práctica de la ley.

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
  {
    id: 'comparativa-normativa-nacional-provincial',
    category: 'Consulta Normativa',
    title: 'Comparativa de normativa nacional vs. provincial',
    description: 'Compara la Ley Nacional 24.449 con las leyes provinciales armonizadas.',
    prompt: `Actuá como un especialista en derecho de tránsito con conocimiento integral de la legislación nacional y provincial peruana.

CONTEXTO:
Necesito determinar si existe conflicto, armonización o complementariedad entre la Ley General de Transporte y Tránsito Terrestre (Ley 27181) y la legislación provincial aplicable a un caso concreto.

TAREA:
Analizá la situación que voy a describir y proporcioná:
1. Texto del artículo aplicable de la Ley General de Transporte y Tránsito Terrestre (Ley 27181).
2. Texto del artículo equivalente en la ley provincial correspondiente.
3. Análisis de concordancia o discrepancia entre ambas normas.
4. Principio de aplicación (ley nacional supletoria vs. ley provincial).
5. Recomendación sobre cuál norma citar en el documento oficial.

FORMATO DE SALIDA:
- Tabla comparativa (aspecto | Ley Nacional | Ley Provincial | Análisis).
- Conclusión con recomendación clara.
- Tono: técnico-jurídico, preciso.

RESTRICCIONES:
- Solo legislación peruana vigente.
- Usar la Ley 27181 y el Reglamento Nacional de Tránsito como referencia.
- No inventes artículos; si no los conocés, indicá que deben verificarse.

SITUACIÓN:
{{situacion}}`,
  },
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
- Basado en Ley 27181 y el Reglamento Nacional de Tránsito y normas provinciales armonizadas.
- Incluí advertencias sobre errores comunes que invalidan el acta.
- Diferenciá entre procedimiento en zona urbana y en ruta.`,
  },
  {
    id: 'procedimiento-alcoholemia',
    category: 'Procedimiento',
    title: 'Procedimiento de control de alcoholemia',
    description: 'Guía detallada para realizar el test de alcoholemia en un control de tránsito.',
    prompt: `Actuá como un instructor de procedimientos de tránsito especializado en controles de alcoholemia.

CONTEXTO:
Un oficial de tránsito debe realizar un control de alcoholemia a un conductor. Necesita una guía clara del procedimiento correcto para garantizar la validez legal de la prueba.

TAREA:
Proporcioná una guía paso a paso que cubra:

FASE 1 - PREVIA:
1. Verificación del funcionamiento del alcoholímetro (calibración vigente).
2. Identificación del tipo de alcoholímetro (evidencial vs. indiciario).
3. Tiempo de espera desde la ingesta (15-20 min mínimo).

FASE 2 - PROCEDIMIENTO:
1. Identificación del conductor y solicitud de sometimiento a la prueba.
2. Información al conductor sobre el derecho a negarse y sus consecuencias.
3. Instrucciones claras al conductor (soplido continuo, sin interrupciones).
4. Realización de la prueba y lectura del resultado.
5. Procedimiento en caso de resultado positivo (doble prueba, contraprueba).

FASE 3 - DOCUMENTACIÓN:
1. Registro del resultado en el acta.
2. Notificación al infractor.
3. Medidas preventivas (retención de licencia, secuestro del vehículo).
4. Remisión al Juzgado de Tránsito.

FORMATO DE SALIDA:
- Pasos numerados con sub-pasos.
- Checklist de verificación.
- Advertencias sobre errores que invalidan la prueba.
- Tono: instructivo, claro, directo.

RESTRICCIONES:
- Basado en la Ley 27181 y el Reglamento Nacional de Tránsito y el Código Procesal Penal Peruano.
- Incluí los tiempos de espera obligatorios entre ingesta y prueba.
- Diferenciá entre alcoholímetro indiciario y evidencial.`,
  },
  {
    id: 'consultar-jurisprudencia',
    category: 'Consulta Normativa',
    title: 'Consultar jurisprudencia relevante',
    description: 'Obtén precedentes judiciales aplicables a un caso de tránsito.',
    prompt: `Actuá como un investigador jurídico especializado en derecho de tránsito y faltas.

CONTEXTO:
Necesito fundamentar un documento oficial con jurisprudencia aplicable a un caso concreto de tránsito, para fortalecer la posición legal del documento.

TAREA:
Analizá el caso que voy a describir y proporcioná:
1. Precedentes judiciales relevantes de la Corte Suprema de la República del Perú y tribunales superiores regionales.
2. Fallos sobre la interpretación de los artículos aplicables.
3. Criterios jurisprudenciales sobre valoración de la prueba en accidentes de tránsito.
4. Doctrina aplicable de autores reconocidos en derecho de tránsito.
5. Citas textuales de fallos relevantes (tribunal, fecha, carátula).

FORMATO DE SALIDA:
- Listado de precedentes ordenados por jerarquía y relevancia.
- Cada precedente con: tribunal, carátula, fecha, extracto del fallo.
- Tono: técnico-jurídico, con citas precisas.

RESTRICCIONES:
- Solo jurisprudencia peruana.
- Si no conocés un fallo específico, indicá que debe consultarse el digesto judicial.
- Priorizá fallos de la Corte Suprema de la República del Perú y tribunales superiores regionales.

SITUACIÓN:
{{situacion}}`,
  },
  {
    id: 'procedimiento-secuestro-vehiculo',
    category: 'Procedimiento',
    title: 'Procedimiento de secuestro de vehículo',
    description: 'Guía completa para el secuestro preventivo de un vehículo en infracción.',
    prompt: `Actuá como un instructor de procedimientos policiales con experiencia en secuestros de vehículos.

CONTEXTO:
Un oficial de tránsito debe proceder al secuestro preventivo de un vehículo por infracción a la Ley de Tránsito. Necesita una guía detallada del procedimiento.

TAREA:
Proporcioná una guía paso a paso que cubra:

FASE 1 - CAUSALES DE SECUESTRO:
1. Conducir sin licencia habilitante.
2. Falta de seguro obligatorio.
3. Falta de Revisión Técnica Vehicular.
4. Conducir bajo efectos del alcohol o estupefacientes.
5. Vehículo con pedido de secuestro.
6. Otras causales previstas en la normativa.

FASE 2 - PROCEDIMIENTO:
1. Comunicación al conductor del motivo del secuestro.
2. Inventario detallado del contenido del vehículo.
3. Acta de secuestro con constancia de estado del vehículo.
4. Designación de depósito o playa de secuestro.
5. Entrega de comprobante al conductor/propietario.

FASE 3 - POSTERIOR:
1. Notificación al Juzgado de Tránsito.
2. Cadena de custodia de objetos secuestrados.
3. Procedimiento de liberación del vehículo.

FORMATO DE SALIDA:
- Guía práctica con pasos numerados.
- Modelo de acta de secuestro.
- Tono: instructivo, claro, con fundamento normativo.

RESTRICCIONES:
- Basado en la Ley 27181 y el Reglamento Nacional de Tránsito y normativa procesal peruana.
- Incluí las consecuencias de no seguir el procedimiento correcto.`,
  },
  {
    id: 'consejos-narracion-accidente',
    category: 'Procedimiento',
    title: 'Consejos para la descripción técnica de un accidente',
    description: 'Guía para redactar una descripción pericial de un siniestro vial.',
    prompt: `Actuá como un perito en accidentología vial peruano con experiencia en reconstrucción de siniestros.

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
  {
    id: 'verificar-completitud-datos',
    category: 'Revisión y Corrección',
    title: 'Verificar completitud de datos obligatorios',
    description: 'Revisa que un parte o acta contenga todos los datos exigidos por la normativa.',
    prompt: `Actuá como un auditor de documentación de tránsito especializado en control de calidad de documentos oficiales.

CONTEXTO:
Necesito verificar que un parte de accidente o acta de infracción contenga todos los datos obligatorios exigidos por la normativa vigente, antes de su presentación formal.

TAREA:
Revisá el documento que te voy a pasar y verificá:

1. DATOS OBLIGATORIOS DEL PARTE DE ACCIDENTE:
   - Número de parte, fecha y hora.
   - Lugar del hecho con referencias.
   - Identificación de vehículos intervinientes.
   - Identificación de conductores.
   - Descripción de los hechos.
   - Datos del oficial actuante.

2. DATOS OBLIGATORIOS DEL ACTA DE INFRACCIÓN:
   - Número de acta, fecha y hora.
   - Lugar de la infracción.
   - Identificación del infractor.
   - Identificación del vehículo.
   - Artículo/s infringido/s.
   - Descripción de la infracción.
   - Datos del inspector actuante.

3. VERIFICACIÓN ADICIONAL:
   - Coherencia entre datos.
   - Fechas y plazos.
   - Firmas y notificaciones.

FORMATO DE SALIDA:
- Lista de verificación (checklist) con cada dato.
- Indicación de datos faltantes o incompletos.
- Tono: profesional, objetivo, constructivo.

RESTRICCIONES:
- No modifiques el contenido del documento.
- Solo indicá qué falta o es incorrecto.

DOCUMENTO A VERIFICAR:
{{documento}}`,
  },
  {
    id: 'revisar-coherencia-interna',
    category: 'Revisión y Corrección',
    title: 'Revisar coherencia interna de un documento',
    description: 'Verifica la consistencia lógica y temporal de un parte o acta.',
    prompt: `Actuá como un auditor de documentación oficial de tránsito.

CONTEXTO:
Necesito revisar la coherencia interna de un documento oficial de tránsito (parte de accidente o acta de infracción) para detectar contradicciones, inconsistencias o errores lógicos antes de su presentación.

TAREA:
Revisá el documento y verificá:

1. COHERENCIA TEMPORAL:
   - La secuencia de eventos es cronológicamente posible.
   - Las horas y fechas son consistentes.
   - Los plazos de notificación se cumplen.

2. COHERENCIA ESPACIAL:
   - Las ubicaciones son consistentes.
   - Las distancias y referencias son lógicas.
   - La posición de los vehículos es físicamente posible.

3. COHERENCIA NORMATIVA:
   - Los artículos citados corresponden a la infracción descripta.
   - Las medidas preventivas son proporcionales.

4. COHERENCIA DOCUMENTAL:
   - Los datos del conductor coinciden con los del vehículo.
   - Los testigos están correctamente identificados.
   - Las firmas y notificaciones están completas.

FORMATO DE SALIDA:
- Listado de inconsistencias encontradas (si las hay).
- Cada inconsistencia con: ubicación en el documento, descripción, corrección sugerida.
- Si no hay inconsistencias, indicar que el documento es coherente.
- Tono: profesional, constructivo.

RESTRICCIONES:
- No modifiques el contenido del documento.
- Solo señalá las inconsistencias; no las corrijas automáticamente.

DOCUMENTO A REVISAR:
{{documento}}`,
  },
];
