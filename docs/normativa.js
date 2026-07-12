const normativa = {
  leyes: [
    {
      nombre: 'Ley General de Transporte y Tránsito Terrestre (Ley 27181)',
      categorias: [
        {
          nombre: 'Estacionamiento y Detención',
          articulos: [
            { ref: 'Ley 27181 Art. 58', desc: 'Estacionamiento en lugares prohibidos' },
            { ref: 'RNT Art. 157', desc: 'Estacionamiento en doble fila' },
            { ref: 'RNT Art. 158', desc: 'Estacionamiento sobre senda peatonal' },
            { ref: 'RNT Art. 159', desc: 'Estacionamiento en esquina' },
            { ref: 'RNT Art. 160', desc: 'Estacionamiento en parada de transporte' },
            { ref: 'RNT Art. 161', desc: 'Estacionamiento en puente o túnel' },
            { ref: 'RNT Art. 162', desc: 'Estacionamiento sobre ciclovía' },
            { ref: 'RNT Art. 163', desc: 'Estacionamiento sobre vereda' }
          ]
        },
        {
          nombre: 'Velocidad',
          articulos: [
            { ref: 'RNT Art. 50', desc: 'Límites máximos de velocidad' },
            { ref: 'RNT Art. 51', desc: 'Exceso de velocidad' },
            { ref: 'RNT Art. 52', desc: 'Velocidad mínima y precaución' }
          ]
        },
        {
          nombre: 'Circulación y Maniobras',
          articulos: [
            { ref: 'RNT Art. 99', desc: 'Uso de luces' },
            { ref: 'RNT Art. 100', desc: 'Señales lumínicas' },
            { ref: 'RNT Art. 101', desc: 'Semáforo y señales de tránsito' },
            { ref: 'RNT Art. 102', desc: 'Giro y rotonda' },
            { ref: 'RNT Art. 103', desc: 'Adelantamiento' },
            { ref: 'RNT Art. 104', desc: 'Sobrepaso' },
            { ref: 'RNT Art. 105', desc: 'Cruce de ferrocarril' },
            { ref: 'RNT Art. 106', desc: 'Circulación por carriles' },
            { ref: 'RNT Art. 107', desc: 'Conducción nocturna y en condiciones adversas' }
          ]
        },
        {
          nombre: 'Alcohol y Sustancias',
          articulos: [
            { ref: 'RNT Art. 55', desc: 'Conducción bajo los efectos del alcohol' },
            { ref: 'RNT Art. 56', desc: 'Conducción bajo efectos de estupefacientes' }
          ]
        },
        {
          nombre: 'Documentación Obligatoria',
          articulos: [
            { ref: 'RNT Art. 25', desc: 'Licencia de conducir (requisito)' },
            { ref: 'RNT Art. 26', desc: 'Clases de licencia' },
            { ref: 'RNT Art. 27', desc: 'Requisitos para obtener licencia' },
            { ref: 'RNT Art. 28', desc: 'Documentación del vehículo' },
            { ref: 'RNT Art. 29', desc: 'Tarjeta de identificación vehicular' }
          ]
        },
        {
          nombre: 'Condiciones Técnicas y SOAT',
          articulos: [
            { ref: 'RNV Art. 48', desc: 'Revisión Técnica Vehicular' },
            { ref: 'RNT Art. 30', desc: 'Condiciones de seguridad del vehículo' },
            { ref: 'Ley 27181 Art. 29', desc: 'SOAT (Seguro Obligatorio de Accidentes de Tránsito)' },
            { ref: 'RNT Art. 31', desc: 'Equipamiento obligatorio' }
          ]
        },
        {
          nombre: 'Cinturón, Casco y Menores',
          articulos: [
            { ref: 'RNT Art. 88', desc: 'Uso de cinturón de seguridad' },
            { ref: 'RNT Art. 89', desc: 'Uso de casco en motocicletas' },
            { ref: 'RNT Art. 90', desc: 'Transporte de menores' }
          ]
        }
      ]
    },
    {
      nombre: 'Reglamento Nacional de Tránsito (DS 016-2009-MTC)',
      categorias: [
        {
          nombre: 'Infracciones y Penalidades',
          articulos: [
            { ref: 'RNT Art. 275', desc: 'Infracciones por exceso de velocidad' },
            { ref: 'RNT Art. 276', desc: 'Infracciones por estacionamiento' },
            { ref: 'RNT Art. 277', desc: 'Alcoholemia positiva' },
            { ref: 'RNT Art. 278', desc: 'Negativa a realizar test de alcoholemia' },
            { ref: 'RNT Art. 279', desc: 'Infracciones por documentación incompleta' },
            { ref: 'RNT Art. 280', desc: 'Infracciones por falta de SOAT' }
          ]
        },
        {
          nombre: 'Procedimiento Sancionador',
          articulos: [
            { ref: 'RNT Art. 290', desc: 'Procedimiento de control' },
            { ref: 'RNT Art. 291', desc: 'Secuestro del vehículo' },
            { ref: 'RNT Art. 292', desc: 'Notificaciones' },
            { ref: 'RNT Art. 293', desc: 'Recursos y apelaciones' }
          ]
        }
      ]
    },
    {
      nombre: 'Código Civil Peruano',
      categorias: [
        {
          nombre: 'Responsabilidad Civil',
          articulos: [
            { ref: 'CC Art. 1969', desc: 'Responsabilidad por daños causados con vehículos' },
            { ref: 'CC Art. 1970', desc: 'Responsabilidad por riesgo creado' },
            { ref: 'CC Art. 1981', desc: 'Responsabilidad del dueño del vehículo' },
            { ref: 'CC Art. 1985', desc: 'Indemnización por daños' }
          ]
        }
      ]
    },
    {
      nombre: 'Código Penal Peruano',
      categorias: [
        {
          nombre: 'Delitos de Tránsito',
          articulos: [
            { ref: 'CP Art. 111', desc: 'Homicidio culposo por accidente de tránsito' },
            { ref: 'CP Art. 124', desc: 'Lesiones culposas por accidente de tránsito' },
            { ref: 'CP Art. 274', desc: 'Conducción en estado de ebriedad o drogadicción' }
          ]
        }
      ]
    }
  ]
};
