import { ref, computed, readonly } from 'vue'

// Importamos dinámicamente todos los archivos JSON de la carpeta datos
const importarTodosDatos = async () => {
  const modules = import.meta.glob('@/datos/*.json')
  const datos = {}
  
  for (const path in modules) {
    try {
      const module = await modules[path]()
      const nombreActivo = path.split('/').pop().replace('.json', '').toUpperCase()
      datos[nombreActivo] = module.default || module
    } catch (error) {
      console.error(`Error cargando ${path}:`, error)
    }
  }
  
  return datos
}

export function useCargadorDatos() {
  const estado = ref({
    todosDatos: null,
    datosActuales: null,
    temporalidad: 'diario',
    activo: null,
    activosDisponibles: [],
    cargando: true
  })

  // Cargar todos los datos al iniciar
  const cargarDatos = async () => {
    estado.value.cargando = true
    estado.value.todosDatos = await importarTodosDatos()
    estado.value.activosDisponibles = Object.keys(estado.value.todosDatos)
    
    // Establecer primer activo disponible por defecto
    if (estado.value.activosDisponibles.length > 0) {
      cambiarActivo(estado.value.activosDisponibles[0])
    }
    
    estado.value.cargando = false
  }

  // Cambiar activo
  const cambiarActivo = (nuevoActivo) => {
    if (estado.value.todosDatos[nuevoActivo]) {
      estado.value.activo = nuevoActivo
      estado.value.datosActuales = estado.value.todosDatos[nuevoActivo]
    }
  }

  // Cambiar temporalidad
  const cambiarTemporalidad = (nuevaTemporalidad) => {
    estado.value.temporalidad = nuevaTemporalidad
  }

  // Procesar datos para gráfico de tops/bottoms
  const procesarDatosPivotes = computed(() => {
    if (!estado.value.datosActuales) return { tops: [], bottoms: [] }
    
    const datos = estado.value.datosActuales.pivot_points?.[estado.value.temporalidad] || {}
    
    const procesar = (items, esTop = true) => {
      return Object.entries(items).map(([clave, valor]) => ({
        clave,
        valor: esTop ? valor : -Math.abs(valor)
      }))
    }

    return {
      tops: procesar(datos.top || {}, true),
      bottoms: procesar(datos.bottom || {}, false)
    }
  })

  // Datos para gráfico circular (bullish/bearish)
  const datosDireccionMercado = computed(() => {
    if (!estado.value.datosActuales) return []
    const direction = estado.value.datosActuales.OHLC?.direction || {}
    return [
      { name: 'Alcista', value: direction.Bullish || 0 },
      { name: 'Bajista', value: direction.Bearish || 0 }
    ]
  })

  // Datos para la tabla OHLC
  const datosOHLCTabla = computed(() => {
    if (!estado.value.datosActuales) return {}
    const ohlc = estado.value.datosActuales.OHLC?.[estado.value.temporalidad] || {}
    return {
      higher_extension: ohlc.higher_extension || {},
      lower_extension: ohlc.lower_extension || {},
      high_fade: ohlc.high_fade || {},
      low_fade: ohlc.low_fade || {}
    }
  })

  // Cargar datos iniciales
  cargarDatos()

  return {
    estado: readonly(estado),
    cambiarActivo,
    cambiarTemporalidad,
    procesarDatosPivotes,
    datosDireccionMercado,
    datosOHLCTabla
  }
}