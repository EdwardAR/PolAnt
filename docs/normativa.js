const normativa = {
  leyes: [
    {
      nombre: 'Ley Nacional de Tránsito 24.449',
      categorias: [
        {
          nombre: 'Estacionamiento y Detención',
          articulos: [
            { ref: 'Ley 24.449 Art. 76', desc: 'Estacionamiento en lugares prohibidos' },
            { ref: 'Ley 24.449 Art. 77 inc. a', desc: 'Estacionamiento en doble fila' },
            { ref: 'Ley 24.449 Art. 77 inc. b', desc: 'Estacionamiento sobre senda peatonal' },
            { ref: 'Ley 24.449 Art. 77 inc. c', desc: 'Estacionamiento en esquina' },
            { ref: 'Ley 24.449 Art. 77 inc. d', desc: 'Estacionamiento en parada de transporte' },
            { ref: 'Ley 24.449 Art. 77 inc. e', desc: 'Estacionamiento en puente o túnel' },
            { ref: 'Ley 24.449 Art. 77 inc. f', desc: 'Estacionamiento sobre ciclovía' },
            { ref: 'Ley 24.449 Art. 78', desc: 'Estacionamiento sobre vereda' }
          ]
        },
        {
          nombre: 'Velocidad',
          articulos: [
            { ref: 'Ley 24.449 Art. 51', desc: 'Límites máximos de velocidad' },
            { ref: 'Ley 24.449 Art. 52', desc: 'Exceso de velocidad' },
            { ref: 'Ley 24.449 Art. 53', desc: 'Velocidad mínima y precaución' }
          ]
        },
        {
          nombre: 'Circulación y Maniobras',
          articulos: [
            { ref: 'Ley 24.449 Art. 39', desc: 'Uso de luces' },
            { ref: 'Ley 24.449 Art. 40', desc: 'Señales lumínicas' },
            { ref: 'Ley 24.449 Art. 41', desc: 'Semáforo y señales de tránsito' },
            { ref: 'Ley 24.449 Art. 42', desc: 'Giro y rotonda' },
            { ref: 'Ley 24.449 Art. 43', desc: 'Adelantamiento' },
            { ref: 'Ley 24.449 Art. 44', desc: 'Sobrepaso' },
            { ref: 'Ley 24.449 Art. 45', desc: 'Cruce de ferrocarril' },
            { ref: 'Ley 24.449 Art. 46', desc: 'Circulación por carriles' },
            { ref: 'Ley 24.449 Art. 47', desc: 'Conducción nocturna y en condiciones adversas' }
          ]
        },
        {
          nombre: 'Alcohol y Sustancias',
          articulos: [
            { ref: 'Ley 24.449 Art. 48', desc: 'Conducción bajo los efectos del alcohol' },
            { ref: 'Ley 24.449 Art. 49', desc: 'Conducción bajo efectos de estupefacientes' }
          ]
        },
        {
          nombre: 'Documentación Obligatoria',
          articulos: [
            { ref: 'Ley 24.449 Art. 12', desc: 'Licencia de conducir (requisito)' },
            { ref: 'Ley 24.449 Art. 13', desc: 'Clases de licencia' },
            { ref: 'Ley 24.449 Art. 14', desc: 'Requisitos para obtener licencia' },
            { ref: 'Ley 24.449 Art. 29', desc: 'Documentación del vehículo' },
            { ref: 'Ley 24.449 Art. 30', desc: 'Cédula de identificación' }
          ]
        },
        {
          nombre: 'Condiciones Técnicas y Seguro',
          articulos: [
            { ref: 'Ley 24.449 Art. 34', desc: 'Revisión Técnica Obligatoria (RTO/VTV)' },
            { ref: 'Ley 24.449 Art. 35', desc: 'Condiciones de seguridad del vehículo' },
            { ref: 'Ley 24.449 Art. 36', desc: 'Seguro obligatorio' },
            { ref: 'Ley 24.449 Art. 37', desc: 'Equipamiento obligatorio' }
          ]
        },
        {
          nombre: 'Cinturón, Casco y Menores',
          articulos: [
            { ref: 'Ley 24.449 Art. 31', desc: 'Uso de cinturón de seguridad' },
            { ref: 'Ley 24.449 Art. 32', desc: 'Uso de casco en motocicletas' },
            { ref: 'Ley 24.449 Art. 33', desc: 'Transporte de menores' }
          ]
        }
      ]
    },
    {
      nombre: 'Ley Provincial Buenos Aires 13.927',
      categorias: [
        {
          nombre: 'Infracciones y Penalidades',
          articulos: [
            { ref: 'Ley 13.927 Art. 40', desc: 'Infracciones por exceso de velocidad' },
            { ref: 'Ley 13.927 Art. 53', desc: 'Infracciones por estacionamiento' },
            { ref: 'Ley 13.927 Art. 72', desc: 'Alcoholemia positiva' },
            { ref: 'Ley 13.927 Art. 73', desc: 'Negativa a realizar test de alcoholemia' }
          ]
        },
        {
          nombre: 'Procedimiento',
          articulos: [
            { ref: 'Ley 13.927 Art. 84', desc: 'Procedimiento de control' },
            { ref: 'Ley 13.927 Art. 85', desc: 'Secuestro del vehículo' },
            { ref: 'Ley 13.927 Art. 88', desc: 'Notificaciones' }
          ]
        }
      ]
    },
    {
      nombre: 'Ley Provincial Córdoba 8.760',
      categorias: [
        {
          nombre: 'Infracciones',
          articulos: [
            { ref: 'Ley 8.760 Art. 105', desc: 'Faltas en general' },
            { ref: 'Ley 8.760 Art. 106', desc: 'Alcoholemia' },
            { ref: 'Ley 8.760 Art. 107', desc: 'Exceso de velocidad' },
            { ref: 'Ley 8.760 Art. 108', desc: 'Estacionamiento indebido' }
          ]
        }
      ]
    },
    {
      nombre: 'Ley Provincial Santa Fe 13.169',
      categorias: [
        {
          nombre: 'Infracciones',
          articulos: [
            { ref: 'Ley 13.169 Art. 78', desc: 'Faltas generales' },
            { ref: 'Ley 13.169 Art. 80', desc: 'Alcoholemia' },
            { ref: 'Ley 13.169 Art. 81', desc: 'Exceso de velocidad' }
          ]
        }
      ]
    },
    {
      nombre: 'Código Civil y Comercial de la Nación',
      categorias: [
        {
          nombre: 'Responsabilidad Civil',
          articulos: [
            { ref: 'CCCN Art. 1757', desc: 'Responsabilidad por daños causados con vehículos' },
            { ref: 'CCCN Art. 1758', desc: 'Autor de la conducción y dueño del vehículo' },
            { ref: 'CCCN Art. 1769', desc: 'Daños causados por animales' },
            { ref: 'CCCN Art. 1770', desc: 'Daños causados por cosas' }
          ]
        }
      ]
    }
  ]
};
