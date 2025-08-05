import { ref, computed, readonly } from 'vue'
import datosOHLC from '@/datos/ohlc.json'
import datosOHLCAdicional from '@/datos/ohlc_data.json'
import datosPivotes from '@/datos/pivot_points.json'

export function useCargadorDatos() {
  // Combinamos todos los datos OHLC
  const datosCombinadosOHLC = {
    ...datosOHLC.OHLC,
    ...datosOHLCAdicional?.OHLC || {}
  }

  const estado = ref({
    datos: {
      ohlc: datosCombinadosOHLC,
      pivotes: datosPivotes.pivot_points
    },
    temporalidad: 'diario',
    activo: 'EURUSD',
    cargando: false
  })

  // Procesar datos de pivotes para gráficos
  const procesarDatosPivotes = (temporalidad = estado.value.temporalidad) => {
    const datosTemporales = estado.value.datos.pivotes[temporalidad]
    
    const procesar = (items, esTop = true) => {
      return Object.entries(items).map(([clave, valor]) => ({
        clave,
        valor: esTop ? valor : -Math.abs(valor)
      }))
    }

    return {
      tops: procesar(datosTemporales.top, true),
      bottoms: procesar(datosTemporales.bottom, false),
      temporalidad
    }
  }

  // Datos para el gráfico circular (bullish/bearish)
  const datosDireccionMercado = computed(() => {
    return [
      { name: 'Alcista', value: estado.value.datos.ohlc.direction.Bullish },
      { name: 'Bajista', value: estado.value.datos.ohlc.direction.Bearish }
    ]
  })

  // Datos para el gráfico de tipos de velas
  const datosTiposVela = computed(() => {
    return Object.entries(estado.value.datos.ohlc.candle_type).map(([name, value]) => ({
      name,
      value
    }))
  })

  // Estadísticas OHLC para la tabla
  const datosOHLCTabla = computed(() => {
    const temp = estado.value.temporalidad
    return {
      higher_extension: estado.value.datos.ohlc[temp]?.higher_extension || {},
      lower_extension: estado.value.datos.ohlc[temp]?.lower_extension || {},
      high_fade: estado.value.datos.ohlc[temp]?.high_fade || {},
      low_fade: estado.value.datos.ohlc[temp]?.low_fade || {}
    }
  })

  // Cambiar temporalidad
  const cambiarTemporalidad = (nuevaTemporalidad) => {
    estado.value.temporalidad = nuevaTemporalidad
  }

  // Cambiar activo
  const cambiarActivo = (nuevoActivo) => {
    estado.value.activo = nuevoActivo
  }

  return {
    estado: readonly(estado),
    procesarDatosPivotes,
    datosDireccionMercado,
    datosTiposVela,
    datosOHLCTabla,
    cambiarTemporalidad,
    cambiarActivo
  }
}