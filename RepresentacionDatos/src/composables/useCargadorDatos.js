import { ref, computed, readonly } from 'vue'

// Estado global singleton - una sola instancia para toda la app
let estadoGlobal = null

// Importamos dinámicamente todos los archivos JSON de la carpeta datos
const importarTodosDatos = async () => {
  const modules = import.meta.glob('@/components/datos/*.json')
  const datos = {}
  
  for (const path in modules) {
    try {
      const module = await modules[path]()
      const nombreActivo = path.split('/').pop().replace('.json', '').toUpperCase()
      
      // Evitar duplicados - priorizar archivos principales
      if (nombreActivo === 'OHLC_DATA') return // Ignorar duplicado
      
      datos[nombreActivo] = module.default || module
    } catch (error) {
      console.error(`Error cargando ${path}:`, error)
    }
  }
  
  return datos
}

// Función para combinar datos de archivos separados en una estructura unificada
const combinarDatos = (datosOHLC, datosPivotes) => {
  return {
    OHLC: datosOHLC.OHLC,
    pivot_points: datosPivotes.pivot_points
  }
}

export function useCargadorDatos() {
  // Si ya existe el estado global, retornarlo (patrón singleton)
  if (estadoGlobal) {
    return estadoGlobal
  }

  const estado = ref({
    todosDatos: null,
    datosActuales: null,
    temporalidad: 'diario',
    activo: null,
    activosDisponibles: [],
    cargando: true,
    error: null
  })

  // Cargar todos los datos al iniciar
  const cargarDatos = async () => {
    try {
      estado.value.cargando = true
      estado.value.error = null
      
      const datosImportados = await importarTodosDatos()
      
      // Combinar datos si hay archivos separados
      if (datosImportados.OHLC && datosImportados.PIVOT_POINTS) {
        const datosCombinados = combinarDatos(datosImportados.OHLC, datosImportados.PIVOT_POINTS)
        estado.value.todosDatos = { COMBINED: datosCombinados }
        estado.value.activosDisponibles = ['COMBINED']
        cambiarActivo('COMBINED')
      } else {
        estado.value.todosDatos = datosImportados
        estado.value.activosDisponibles = Object.keys(datosImportados)
        
        // Establecer primer activo disponible por defecto
        if (estado.value.activosDisponibles.length > 0) {
          cambiarActivo(estado.value.activosDisponibles[0])
        }
      }
      
    } catch (error) {
      console.error('Error al cargar datos:', error)
      estado.value.error = 'Error al cargar los datos. Verifique que los archivos JSON estén disponibles.'
    } finally {
      estado.value.cargando = false
    }
  }

  // Cambiar activo
  const cambiarActivo = (nuevoActivo) => {
    if (estado.value.todosDatos?.[nuevoActivo]) {
      estado.value.activo = nuevoActivo
      estado.value.datosActuales = estado.value.todosDatos[nuevoActivo]
      console.log('Activo cambiado a:', nuevoActivo, estado.value.datosActuales)
    }
  }

  // Cambiar temporalidad
  const cambiarTemporalidad = (nuevaTemporalidad) => {
    if (['diario', 'semanal', 'mensual'].includes(nuevaTemporalidad)) {
      console.log('Cambiando temporalidad de', estado.value.temporalidad, 'a', nuevaTemporalidad)
      estado.value.temporalidad = nuevaTemporalidad
    }
  }

  // Procesar datos para gráfico de tops/bottoms con validaciones
  const procesarDatosPivotes = computed(() => {
    if (!estado.value.datosActuales?.pivot_points) {
      console.warn('No hay datos de pivot_points disponibles')
      return { tops: [], bottoms: [] }
    }
    
    const temporalidadActual = estado.value.temporalidad
    console.log('Procesando pivotes para temporalidad:', temporalidadActual)
    console.log('Datos de pivot_points:', estado.value.datosActuales.pivot_points)
    
    const pivotes = estado.value.datosActuales.pivot_points[temporalidadActual]
    
    if (!pivotes) {
      console.warn(`No hay datos para temporalidad: ${temporalidadActual}`)
      return { tops: [], bottoms: [] }
    }
    
    console.log('Pivotes encontrados:', pivotes)
    
    const procesar = (items, esTop = true) => {
      if (!items || typeof items !== 'object') return []
      return Object.entries(items).map(([clave, valor]) => ({
        clave,
        valor: esTop ? Number(valor) : -Math.abs(Number(valor))
      }))
    }
    
    const resultado = {
      tops: procesar(pivotes.top, true),
      bottoms: procesar(pivotes.bottom, false)
    }
    
    console.log('Datos procesados:', resultado)
    return resultado
  })

  // Datos para gráfico circular (bullish/bearish)
  const datosDireccionMercado = computed(() => {
    if (!estado.value.datosActuales?.OHLC?.direction) {
      return [
        { name: 'Alcista', value: 0 },
        { name: 'Bajista', value: 0 }
      ]
    }
    
    const direction = estado.value.datosActuales.OHLC.direction
    return [
      { name: 'Alcista', value: Number(direction.Bullish) || 0 },
      { name: 'Bajista', value: Number(direction.Bearish) || 0 }
    ]
  })

  // Datos para la tabla OHLC con mapeo correcto de temporalidad
  const datosOHLCTabla = computed(() => {
    if (!estado.value.datosActuales?.OHLC) {
      return {}
    }
    
    // Mapeo de temporalidad para OHLC (primera letra mayúscula)
    const temporalidadMayuscula = {
      diario: 'Diario',
      semanal: 'Semanal',
      mensual: 'Mensual'
    }[estado.value.temporalidad] || 'Diario'
    
    console.log('Buscando datos OHLC para:', temporalidadMayuscula)
    console.log('Datos OHLC disponibles:', Object.keys(estado.value.datosActuales.OHLC))
    
    const ohlc = estado.value.datosActuales.OHLC[temporalidadMayuscula] || {}
    
    return {
      higher_extension: ohlc.higher_extension || {},
      lower_extension: ohlc.lower_extension || {},
      high_fade: ohlc.high_fade || {},
      low_fade: ohlc.low_fade || {}
    }
  })

  // Cargar datos iniciales
  cargarDatos()

  // Crear el objeto singleton
  estadoGlobal = {
    estado: readonly(estado),
    cambiarActivo,
    cambiarTemporalidad,
    procesarDatosPivotes,
    datosDireccionMercado,
    datosOHLCTabla,
    recargarDatos: cargarDatos
  }

  return estadoGlobal
}