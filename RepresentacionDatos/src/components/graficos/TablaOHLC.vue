<template>
  <div class="tabla-ohlc">
    <table>
      <thead>
        <tr>
          <th>Métrica</th>
          <th>Media</th>
          <th>Desv. Est.</th>
          <th>P25%</th>
          <th>P50%</th>
          <th>P75%</th>
          <th>Máx</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(valores, key) in datosOHLCTabla" :key="key">
          <td>{{ formatearNombreMetric(key) }}</td>
          <td>{{ valores.Mean?.toFixed(2) || '-' }}</td>
          <td>{{ valores.Std?.toFixed(2) || '-' }}</td>
          <td>{{ valores.P25?.toFixed(2) || '-' }}</td>
          <td>{{ valores.P50?.toFixed(2) || '-' }}</td>
          <td>{{ valores.P75?.toFixed(2) || '-' }}</td>
          <td>{{ valores.Max?.toFixed(2) || '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useCargadorDatos } from '@/composables/useCargadorDatos';

export default {
  name: 'TablaOHLC',
  setup() {
    const { datosOHLCTabla } = useCargadorDatos();

    const formatearNombreMetric = (metric) => {
      const nombres = {
        higher_extension: 'Extensión Superior',
        lower_extension: 'Extensión Inferior',
        high_fade: 'High Fade',
        low_fade: 'Low Fade',
      };
      return nombres[metric] || metric;
    };

    return {
      datosOHLCTabla,
      formatearNombreMetric,
    };
  },
};
</script>

<style scoped>
.tabla-ohlc {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px 12px;
  text-align: center;
  border-bottom: 1px solid #e2e8f0;
}

th {
  background-color: #f8fafc;
  font-weight: 600;
}

tr:hover {
  background-color: #f1f5f9;
}
</style>