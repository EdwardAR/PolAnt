const parteAccidente = {
  id: 'parte-accidente',
  title: 'Parte de Accidente de Tránsito',
  sections: [
    {
      title: 'Fecha y Hora',
      icon: 'calendar',
      fields: [
        { name: 'nroParte', label: 'N° de Parte', type: 'text', required: true },
        { name: 'fecha', label: 'Fecha', type: 'date', required: true },
        { name: 'hora', label: 'Hora', type: 'time', required: true }
      ]
    },
    {
      title: 'Lugar del Hecho',
      icon: 'pin',
      fields: [
        { name: 'calle', label: 'Calle / Carretera', type: 'text', required: true },
        { name: 'altura', label: 'Altura / Km', type: 'text' },
        { name: 'entreCalle1', label: 'Entre calle', type: 'text' },
        { name: 'entreCalle2', label: 'Y calle', type: 'text' },
        { name: 'distrito', label: 'Distrito', type: 'text', required: true },
        { name: 'provincia', label: 'Provincia / Departamento', type: 'text', required: true }
      ]
    },
    {
      title: 'Clasificación del Accidente',
      icon: 'tag',
      fields: [
        {
          name: 'tipoAccidente', label: 'Tipo de Accidente', type: 'select', required: true,
          options: [
            'Colisión entre vehículos',
            'Colisión con objeto fijo',
            'Atropellamiento',
            'Vuelco',
            'Caída de pasajero',
            'Incendio',
            'Otro'
          ]
        },
        {
          name: 'claseAccidente', label: 'Clase', type: 'select', required: true,
          options: ['Simple', 'Múltiple', 'En cadena']
        }
      ]
    },
    {
      title: 'Vehículo 1',
      icon: 'carFront',
      fields: [
        { name: 'v1Placa', label: 'Placa (N° de placa)', type: 'text', required: true },
        { name: 'v1Marca', label: 'Marca', type: 'text', required: true },
        { name: 'v1Modelo', label: 'Modelo', type: 'text' },
        { name: 'v1Tipo', label: 'Tipo', type: 'select',
          options: ['Automóvil', 'Camioneta', 'Camión', 'Motocicleta', 'Bicicleta', 'Colectivo', 'Acoplado', 'Maquinaria agrícola', 'Otro'] },
        { name: 'v1Anio', label: 'Año', type: 'text' },
        { name: 'v1Color', label: 'Color', type: 'text' },
        { name: 'v1Conductor', label: 'Conductor (Apellidos y Nombres)', type: 'text', required: true, autocomplete: 'name' },
        { name: 'v1ConductorDni', label: 'DNI del Conductor', type: 'text' },
        { name: 'v1LicenciaClase', label: 'Clase de Licencia', type: 'text' },
        { name: 'v1LicenciaNro', label: 'N° de Licencia', type: 'text' },
        { name: 'v1Propietario', label: 'Propietario', type: 'text' },
        { name: 'v1Soat', label: 'SOAT (Compañía)', type: 'text' },
        { name: 'v1Poliza', label: 'N° de Póliza SOAT', type: 'text' }
      ]
    },
    {
      title: 'Vehículo 2',
      icon: 'carFront',
      fields: [
        { name: 'v2Placa', label: 'Placa (N° de placa)', type: 'text' },
        { name: 'v2Marca', label: 'Marca', type: 'text' },
        { name: 'v2Modelo', label: 'Modelo', type: 'text' },
        { name: 'v2Tipo', label: 'Tipo', type: 'select',
          options: ['Automóvil', 'Camioneta', 'Camión', 'Motocicleta', 'Bicicleta', 'Colectivo', 'Acoplado', 'Maquinaria agrícola', 'Otro'] },
        { name: 'v2Anio', label: 'Año', type: 'text' },
        { name: 'v2Color', label: 'Color', type: 'text' },
        { name: 'v2Conductor', label: 'Conductor (Apellidos y Nombres)', type: 'text', autocomplete: 'name' },
        { name: 'v2ConductorDni', label: 'DNI del Conductor', type: 'text' },
        { name: 'v2LicenciaClase', label: 'Clase de Licencia', type: 'text' },
        { name: 'v2LicenciaNro', label: 'N° de Licencia', type: 'text' },
        { name: 'v2Propietario', label: 'Propietario', type: 'text' },
        { name: 'v2Soat', label: 'SOAT (Compañía)', type: 'text' },
        { name: 'v2Poliza', label: 'N° de Póliza SOAT', type: 'text' }
      ]
    },
    {
      title: 'Personas y Lesiones',
      icon: 'user',
      fields: [
        { name: 'hayLesionados', label: '¿Hubo lesionados?', type: 'select', required: true,
          options: [
            { value: 'no', label: 'No' },
            { value: 'si', label: 'Sí' }
          ]
        },
        { name: 'cantidadLesionados', label: 'Cantidad de lesionados', type: 'text', visibleWhen: { field: 'hayLesionados', value: 'si' } },
        { name: 'lesionesGraves', label: 'Lesiones graves', type: 'text', placeholder: 'Describir lesiones graves si las hubo', visibleWhen: { field: 'hayLesionados', value: 'si' } },
        { name: 'fallecidos', label: 'Fallecidos', type: 'text', visibleWhen: { field: 'hayLesionados', value: 'si' } },
        { name: 'derivadosA', label: 'Derivados a', type: 'text', placeholder: 'Hospital / Centro de salud', visibleWhen: { field: 'hayLesionados', value: 'si' } }
      ]
    },
    {
      title: 'Narración y Croquis',
      icon: 'file',
      fields: [
        { name: 'croquis', label: 'Croquis / Esquema', type: 'textarea', rows: 6,
          placeholder: 'Describa la posición de los vehículos, sentido de circulación, señalización, etc.' },
        { name: 'narracion', label: 'Narración de los hechos', type: 'textarea', rows: 8, required: true,
          placeholder: 'Relato detallado y cronológico de los hechos en lenguaje técnico-jurídico' },
        { name: 'condicionesAmbientales', label: 'Condiciones ambientales', type: 'text',
          placeholder: 'Ej: clima, visibilidad, estado de la calzada' },
        { name: 'senalizacion', label: 'Señalización del lugar', type: 'text',
          placeholder: 'Ej: semáforos, señales verticales, demarcación horizontal' }
      ]
    },
    {
      title: 'Testigos',
      icon: 'users',
      fields: [
        { name: 'testigo1', label: 'Testigo 1 (Apellidos y Nombres)', type: 'text' },
        { name: 'testigo1Dni', label: 'DNI Testigo 1', type: 'text' },
        { name: 'testigo1Domicilio', label: 'Domicilio Testigo 1', type: 'text', autocomplete: 'street-address' },
        { name: 'testigo2', label: 'Testigo 2 (Apellidos y Nombres)', type: 'text' },
        { name: 'testigo2Dni', label: 'DNI Testigo 2', type: 'text' },
        { name: 'testigo2Domicilio', label: 'Domicilio Testigo 2', type: 'text', autocomplete: 'street-address' }
      ]
    },
    {
      title: 'Autoridad Actuante',
      icon: 'shield',
      fields: [
        { name: 'oficialNombre', label: 'Apellidos y Nombres del Efectivo PNP', type: 'text', required: true },
        { name: 'oficialPlaca', label: 'N° de Placa / CIP', type: 'text', required: true },
        { name: 'oficialUnidad', label: 'Unidad / Comisaría / División', type: 'text', required: true },
        { name: 'firma', label: 'Firma / Rúbrica', type: 'text',
          placeholder: 'Nombre completo y cargo' }
      ]
    }
  ],
  template: `
<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 210mm; margin: 0 auto; padding: 20px; font-size: 12pt; line-height: 1.6;">
  <div style="text-align: center; margin-bottom: 24px; border-bottom: 2px solid #000; padding-bottom: 12px;">
    <h1 style="font-size: 16pt; font-weight: bold; margin-bottom: 4px;">PARTE DE ACCIDENTE DE TRÁNSITO</h1>
    <p style="font-size: 10pt;">N° {{nroParte}}</p>
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
    <tr>
      <td style="width: 50%; padding: 4px 8px;"><strong>Fecha:</strong> {{fecha}}</td>
      <td style="width: 50%; padding: 4px 8px;"><strong>Hora:</strong> {{hora}}</td>
    </tr>
  </table>

  <h2 style="font-size: 13pt; font-weight: bold; margin-top: 16px; margin-bottom: 8px; border-bottom: 1px solid #999; padding-bottom: 4px;">Lugar del Hecho</h2>
  <p><strong>Calle/Carretera:</strong> {{calle}} {{altura}}</p>
  <p><strong>Entre calles:</strong> {{entreCalle1}} y {{entreCalle2}}</p>
  <p><strong>Distrito:</strong> {{distrito}} — <strong>Provincia:</strong> {{provincia}}</p>

  <h2 style="font-size: 13pt; font-weight: bold; margin-top: 16px; margin-bottom: 8px; border-bottom: 1px solid #999; padding-bottom: 4px;">Clasificación</h2>
  <p><strong>Tipo de accidente:</strong> {{tipoAccidente}}</p>
  <p><strong>Clase:</strong> {{claseAccidente}}</p>

  <h2 style="font-size: 13pt; font-weight: bold; margin-top: 16px; margin-bottom: 8px; border-bottom: 1px solid #999; padding-bottom: 4px;">Vehículo 1</h2>
  <table style="width: 100%; border-collapse: collapse; border: 1px solid #000; margin-bottom: 12px;">
    <tr><td style="border: 1px solid #000; padding: 4px 8px; width: 30%;"><strong>Placa</strong></td><td style="border: 1px solid #000; padding: 4px 8px;">{{v1Placa}}</td></tr>
    <tr><td style="border: 1px solid #000; padding: 4px 8px;"><strong>Marca / Modelo</strong></td><td style="border: 1px solid #000; padding: 4px 8px;">{{v1Marca}} {{v1Modelo}}</td></tr>
    <tr><td style="border: 1px solid #000; padding: 4px 8px;"><strong>Tipo / Año / Color</strong></td><td style="border: 1px solid #000; padding: 4px 8px;">{{v1Tipo}} — {{v1Anio}} — {{v1Color}}</td></tr>
    <tr><td style="border: 1px solid #000; padding: 4px 8px;"><strong>Conductor</strong></td><td style="border: 1px solid #000; padding: 4px 8px;">{{v1Conductor}} (DNI {{v1ConductorDni}})</td></tr>
    <tr><td style="border: 1px solid #000; padding: 4px 8px;"><strong>Licencia</strong></td><td style="border: 1px solid #000; padding: 4px 8px;">Clase {{v1LicenciaClase}} — N° {{v1LicenciaNro}}</td></tr>
    <tr><td style="border: 1px solid #000; padding: 4px 8px;"><strong>Propietario</strong></td><td style="border: 1px solid #000; padding: 4px 8px;">{{v1Propietario}}</td></tr>
    <tr><td style="border: 1px solid #000; padding: 4px 8px;"><strong>SOAT</strong></td><td style="border: 1px solid #000; padding: 4px 8px;">{{v1Soat}} — Póliza N° {{v1Poliza}}</td></tr>
  </table>

  <h2 style="font-size: 13pt; font-weight: bold; margin-top: 16px; margin-bottom: 8px; border-bottom: 1px solid #999; padding-bottom: 4px;">Vehículo 2</h2>
  <table style="width: 100%; border-collapse: collapse; border: 1px solid #000; margin-bottom: 12px;">
    <tr><td style="border: 1px solid #000; padding: 4px 8px; width: 30%;"><strong>Placa</strong></td><td style="border: 1px solid #000; padding: 4px 8px;">{{v2Placa}}</td></tr>
    <tr><td style="border: 1px solid #000; padding: 4px 8px;"><strong>Marca / Modelo</strong></td><td style="border: 1px solid #000; padding: 4px 8px;">{{v2Marca}} {{v2Modelo}}</td></tr>
    <tr><td style="border: 1px solid #000; padding: 4px 8px;"><strong>Tipo / Año / Color</strong></td><td style="border: 1px solid #000; padding: 4px 8px;">{{v2Tipo}} — {{v2Anio}} — {{v2Color}}</td></tr>
    <tr><td style="border: 1px solid #000; padding: 4px 8px;"><strong>Conductor</strong></td><td style="border: 1px solid #000; padding: 4px 8px;">{{v2Conductor}} (DNI {{v2ConductorDni}})</td></tr>
    <tr><td style="border: 1px solid #000; padding: 4px 8px;"><strong>Licencia</strong></td><td style="border: 1px solid #000; padding: 4px 8px;">Clase {{v2LicenciaClase}} — N° {{v2LicenciaNro}}</td></tr>
    <tr><td style="border: 1px solid #000; padding: 4px 8px;"><strong>Propietario</strong></td><td style="border: 1px solid #000; padding: 4px 8px;">{{v2Propietario}}</td></tr>
    <tr><td style="border: 1px solid #000; padding: 4px 8px;"><strong>SOAT</strong></td><td style="border: 1px solid #000; padding: 4px 8px;">{{v2Soat}} — Póliza N° {{v2Poliza}}</td></tr>
  </table>

  <h2 style="font-size: 13pt; font-weight: bold; margin-top: 16px; margin-bottom: 8px; border-bottom: 1px solid #999; padding-bottom: 4px;">Personas y Lesiones</h2>
  <p><strong>¿Hubo lesionados?</strong> {{hayLesionados}}</p>
  <p><strong>Cantidad de lesionados:</strong> {{cantidadLesionados}}</p>
  <p><strong>Lesiones graves:</strong> {{lesionesGraves}}</p>
  <p><strong>Fallecidos:</strong> {{fallecidos}}</p>
  <p><strong>Derivados a:</strong> {{derivadosA}}</p>

  <h2 style="font-size: 13pt; font-weight: bold; margin-top: 16px; margin-bottom: 8px; border-bottom: 1px solid #999; padding-bottom: 4px;">Croquis</h2>
  <div style="border: 1px solid #000; min-height: 120px; padding: 12px; margin-bottom: 16px; white-space: pre-wrap;">{{croquis}}</div>

  <h2 style="font-size: 13pt; font-weight: bold; margin-top: 16px; margin-bottom: 8px; border-bottom: 1px solid #999; padding-bottom: 4px;">Narración de los Hechos</h2>
  <p style="text-align: justify; white-space: pre-wrap;">{{narracion}}</p>

  <p style="margin-top: 8px;"><strong>Condiciones ambientales:</strong> {{condicionesAmbientales}}</p>
  <p><strong>Señalización del lugar:</strong> {{senalizacion}}</p>

  <h2 style="font-size: 13pt; font-weight: bold; margin-top: 16px; margin-bottom: 8px; border-bottom: 1px solid #999; padding-bottom: 4px;">Testigos</h2>
  <p><strong>Testigo 1:</strong> {{testigo1}} — DNI {{testigo1Dni}} — {{testigo1Domicilio}}</p>
  <p><strong>Testigo 2:</strong> {{testigo2}} — DNI {{testigo2Dni}} — {{testigo2Domicilio}}</p>

  <h2 style="font-size: 13pt; font-weight: bold; margin-top: 16px; margin-bottom: 8px; border-bottom: 1px solid #999; padding-bottom: 4px;">Autoridad Actuante</h2>
  <p><strong>Efectivo PNP:</strong> {{oficialNombre}}</p>
  <p><strong>Placa / CIP:</strong> {{oficialPlaca}}</p>
  <p><strong>Unidad / Comisaría:</strong> {{oficialUnidad}}</p>

  <div style="margin-top: 32px; text-align: center;">
    <p>_________________________________</p>
    <p>{{firma}}</p>
    <p style="font-size: 10pt; margin-top: 4px;">Firma del Efectivo Actuante</p>
  </div>
</div>
  `
};
