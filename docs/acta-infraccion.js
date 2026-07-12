export const actaInfraccion = {
  id: 'acta-infraccion',
  title: 'Acta de Infracción',
  sections: [
    {
       icon: 'calendar',
      fields: [
        { name: 'nroActa', label: 'N° de Acta', type: 'text', required: true },
        { name: 'fecha', label: 'Fecha', type: 'date', required: true },
        { name: 'hora', label: 'Hora', type: 'time', required: true }
      ]
    },
    {
       icon: 'pin',
      fields: [
        { name: 'calle', label: 'Calle / Ruta', type: 'text', required: true },
        { name: 'altura', label: 'Altura / Km', type: 'text' },
        { name: 'localidad', label: 'Localidad', type: 'text', required: true, autocomplete: 'address-level2' },
        { name: 'partido', label: 'Partido', type: 'text', autocomplete: 'address-level1' }
      ]
    },
    {
       icon: 'user',
      fields: [
        { name: 'infractorNombre', label: 'Apellido y Nombre', type: 'text', required: true, autocomplete: 'name' },
        { name: 'infractorDni', label: 'DNI', type: 'text', required: true },
        { name: 'infractorDomicilio', label: 'Domicilio', type: 'text', required: true, autocomplete: 'street-address' },
        { name: 'infractorTelefono', label: 'Teléfono', type: 'text', autocomplete: 'tel' }
      ]
    },
    {
       icon: 'creditCard',
      fields: [
        { name: 'licenciaClase', label: 'Clase', type: 'text' },
        { name: 'licenciaNro', label: 'N° de Licencia', type: 'text' },
        { name: 'licenciaVencimiento', label: 'Vencimiento', type: 'date' },
        { name: 'licenciaCategoria', label: 'Categoría', type: 'text',
          placeholder: 'Ej: Particular, Profesional' }
      ]
    },
    {
       icon: 'carFront',
      fields: [
        { name: 'vehiculoDominio', label: 'Dominio (Patente)', type: 'text', required: true },
        { name: 'vehiculoTipo', label: 'Tipo', type: 'select', required: true,
          options: ['Automóvil', 'Camioneta', 'Camión', 'Motocicleta', 'Bicicleta', 'Colectivo', 'Acoplado', 'Maquinaria agrícola', 'Otro'] },
        { name: 'vehiculoMarca', label: 'Marca', type: 'text' },
        { name: 'vehiculoModelo', label: 'Modelo', type: 'text' },
        { name: 'vehiculoAnio', label: 'Año', type: 'text' }
      ]
    },
    {
       icon: 'alertTriangle',
      fields: [
        { name: 'articulos', label: 'Artículo/s infringido/s', type: 'normativa' },
        { name: 'descripcionInfraccion', label: 'Descripción de la infracción', type: 'textarea', rows: 5, required: true,
          placeholder: 'Descripción detallada de la conducta infraccionaria' },
        { name: 'tipoInfraccion', label: 'Tipo de infracción', type: 'select',
          options: ['Estacionamiento indebido', 'Exceso de velocidad', 'Conducir sin licencia', 'Conducir bajo efectos del alcohol', 'Cruce semáforo en rojo', 'Documentación incompleta', 'Falta de seguro', 'Falta de VTV / RTO', 'Uso de celular al conducir', 'No uso de cinturón de seguridad', 'No uso de casco', 'Otra'] },
        { name: 'medidaPreventiva', label: 'Medida preventiva adoptada', type: 'select',
          options: ['Ninguna', 'Secuestro del vehículo', 'Retención de licencia', 'Secuestro de documentación'] }
      ]
    },
    {
       icon: 'bell',
      fields: [
        { name: 'notificadoEn', label: 'Notificado en el acto', type: 'select', required: true,
          options: [
            { value: 'si', label: 'Sí' },
            { value: 'no', label: 'No' }
          ]
        },
        { name: 'firmaInfractor', label: '¿Firmó el infractor?', type: 'select',
          options: [
            { value: 'si', label: 'Sí' },
            { value: 'no', label: 'No' }
          ],
          visibleWhen: { field: 'notificadoEn', value: 'si' }
        }
      ]
    },
    {
       icon: 'shield',
      fields: [
        { name: 'inspectorNombre', label: 'Apellido y Nombre del Inspector', type: 'text', required: true },
        { name: 'inspectorPlaca', label: 'N° de Placa / Legajo', type: 'text', required: true },
        { name: 'inspectorUnidad', label: 'Unidad / Dependencia', type: 'text', required: true },
        { name: 'inspectorFirma', label: 'Firma digital / Rúbrica', type: 'text',
          placeholder: 'Nombre completo y cargo' }
      ]
    }
  ],
  template: `
<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 210mm; margin: 0 auto; padding: 20px; font-size: 12pt; line-height: 1.6;">
  <div style="text-align: center; margin-bottom: 24px; border-bottom: 2px solid #000; padding-bottom: 12px;">
    <h1 style="font-size: 16pt; font-weight: bold; margin-bottom: 4px;">ACTA DE INFRACCIÓN DE TRÁNSITO</h1>
    <p style="font-size: 10pt;">N° {{nroActa}}</p>
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
    <tr>
      <td style="width: 50%; padding: 4px 8px;"><strong>Fecha:</strong> {{fecha}}</td>
      <td style="width: 50%; padding: 4px 8px;"><strong>Hora:</strong> {{hora}}</td>
    </tr>
  </table>

  <h2 style="font-size: 13pt; font-weight: bold; margin-top: 16px; margin-bottom: 8px; border-bottom: 1px solid #999; padding-bottom: 4px;">Lugar de la Infracción</h2>
  <p><strong>Calle/Ruta:</strong> {{calle}} {{altura}}</p>
  <p><strong>Localidad:</strong> {{localidad}} — <strong>Partido:</strong> {{partido}}</p>

  <h2 style="font-size: 13pt; font-weight: bold; margin-top: 16px; margin-bottom: 8px; border-bottom: 1px solid #999; padding-bottom: 4px;">Datos del Infractor</h2>
  <p><strong>Apellido y Nombre:</strong> {{infractorNombre}}</p>
  <p><strong>DNI:</strong> {{infractorDni}} — <strong>Teléfono:</strong> {{infractorTelefono}}</p>
  <p><strong>Domicilio:</strong> {{infractorDomicilio}}</p>

  <h2 style="font-size: 13pt; font-weight: bold; margin-top: 16px; margin-bottom: 8px; border-bottom: 1px solid #999; padding-bottom: 4px;">Licencia de Conducir</h2>
  <p><strong>Clase:</strong> {{licenciaClase}} — <strong>N°:</strong> {{licenciaNro}} — <strong>Vencimiento:</strong> {{licenciaVencimiento}}</p>
  <p><strong>Categoría:</strong> {{licenciaCategoria}}</p>

  <h2 style="font-size: 13pt; font-weight: bold; margin-top: 16px; margin-bottom: 8px; border-bottom: 1px solid #999; padding-bottom: 4px;">Vehículo Involucrado</h2>
  <table style="width: 100%; border-collapse: collapse; border: 1px solid #000; margin-bottom: 12px;">
    <tr><td style="border: 1px solid #000; padding: 4px 8px; width: 30%;"><strong>Dominio</strong></td><td style="border: 1px solid #000; padding: 4px 8px;">{{vehiculoDominio}}</td></tr>
    <tr><td style="border: 1px solid #000; padding: 4px 8px;"><strong>Tipo</strong></td><td style="border: 1px solid #000; padding: 4px 8px;">{{vehiculoTipo}}</td></tr>
    <tr><td style="border: 1px solid #000; padding: 4px 8px;"><strong>Marca / Modelo</strong></td><td style="border: 1px solid #000; padding: 4px 8px;">{{vehiculoMarca}} {{vehiculoModelo}} ({{vehiculoAnio}})</td></tr>
  </table>

  <h2 style="font-size: 13pt; font-weight: bold; margin-top: 16px; margin-bottom: 8px; border-bottom: 1px solid #999; padding-bottom: 4px;">Infracción</h2>
  <p><strong>Artículo/s infringido/s:</strong> {{articulos}}</p>
  <p><strong>Tipo de infracción:</strong> {{tipoInfraccion}}</p>
  <p style="text-align: justify; white-space: pre-wrap;"><strong>Descripción:</strong> {{descripcionInfraccion}}</p>
  <p><strong>Medida preventiva adoptada:</strong> {{medidaPreventiva}}</p>

  <h2 style="font-size: 13pt; font-weight: bold; margin-top: 16px; margin-bottom: 8px; border-bottom: 1px solid #999; padding-bottom: 4px;">Notificaciones</h2>
  <p><strong>Notificado en el acto:</strong> {{notificadoEn}}</p>
  <p><strong>¿Firmó el infractor?</strong> {{firmaInfractor}}</p>

  <h2 style="font-size: 13pt; font-weight: bold; margin-top: 16px; margin-bottom: 8px; border-bottom: 1px solid #999; padding-bottom: 4px;">Autoridad Actuante</h2>
  <p><strong>Inspector:</strong> {{inspectorNombre}}</p>
  <p><strong>Placa / Legajo:</strong> {{inspectorPlaca}}</p>
  <p><strong>Unidad / Dependencia:</strong> {{inspectorUnidad}}</p>

  <div style="margin-top: 32px; text-align: center;">
    <p>_________________________________</p>
    <p>{{inspectorFirma}}</p>
    <p style="font-size: 10pt; margin-top: 4px;">Firma del Inspector Actuante</p>
  </div>
</div>
  `
};
