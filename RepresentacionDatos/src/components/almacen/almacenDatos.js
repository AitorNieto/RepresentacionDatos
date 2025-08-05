import { reactive, readonly } from 'vue'
import datosOHLC from '@/datos/ohlc.json'
import datosPivotes from '@/datos/pivot_points.json'

const estado = reactive({
  datos: {
    ohlc: datosOHLC.OHLC,
    pivotes: datosPivotes.pivot_points
  },
  temporalidad: 'diario',
  activo: 'EURUSD',
  configGraficos: {
    tipo: 'barra',
    mostrarLeyenda: true,
    colorPrincipal: '#3b82f6',
    colorSecundario: '#ea580c'
  },
  cargando: false
})

export const useAlmacenDatos = () => {
  const cambiarTemporalidad = (nuevaTemporalidad) => {
    estado.temporalidad = nuevaTemporalidad
  }

  const cambiarActivo = (nuevoActivo) => {
    estado.activo = nuevoActivo
  }

  const actualizarConfigGraficos = (nuevaConfig) => {
    estado.configGraficos = { ...estado.configGraficos, ...nuevaConfig }
  }

  const setCargando = (valor) => {
    estado.cargando = valor
  }

  const procesarDatosPivotes = (temporalidad = estado.temporalidad) => {
    const datosTemporales = estado.datos.pivotes[temporalidad]
    
    const procesar = (items, esTop = true) => {
      return Object.entries(items).map(([clave, valor]) => ({
        clave,
        valor: esTop ? valor : -Math.abs(valor)
      }))
    }

    return {
      tops: procesar(datosTemporales.top, true),
      bottoms: procesar(datosTemporales.bottom, false)
    }
  }

  return {
    estado: readonly(estado),
    cambiarTemporalidad,
    cambiarActivo,
    actualizarConfigGraficos,
    setCargando,
    procesarDatosPivotes
  }
}