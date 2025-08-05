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
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  padding: 12px 16px;
  text-align: center;
  border-bottom: 1px solid #e2e8f0;
}

th {
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
}

tr:nth-child(even) {
  background-color: #f9fafb;
}

tr:nth-child(odd) {
  background-color: #ffffff;
}

tr:hover {
  background-color: #e5f3ff;
}

td {
  color: #374151;
  font-size: 0.95rem;
}
</style>