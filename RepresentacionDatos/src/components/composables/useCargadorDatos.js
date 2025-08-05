// src/composables/useCargadorDatos.js
import { ref } from 'vue';

import datosOHLC from '@/datos/ohlc.json';
import datosPivotes from '@/datos/pivot_points.json';

export function useCargadorDatos() {
  const datos = ref({
    ohlc: datosOHLC,
    pivotes: datosPivotes
  });

  const procesarDatosPivotes = (temporalidad) => {
    const datosTemporales = datos.value.pivotes.pivot_points[temporalidad];
    return {
      tops: Object.entries(datosTemporales.top).map(([clave, valor]) => ({
        clave,
        valor
      })),
      bottoms: Object.entries(datosTemporales.bottom).map(([clave, valor]) => ({
        clave,
        valor: -Math.abs(valor) // Convertimos a negativo para el gráfico
      }))
    };
  };

  return {
    datos,
    procesarDatosPivotes
  };
}