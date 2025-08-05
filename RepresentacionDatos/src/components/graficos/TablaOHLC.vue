<template>
  <div class="tarjeta-tabla">
    <h3>Estadísticas OHLC - {{ temporalidadFormateada }}</h3>
    <div class="filtros">
      <select v-model="metricSeleccionada" class="selector">
        <option v-for="metric in metricDisponibles" :key="metric" :value="metric">
          {{ formatearNombreMetric(metric) }}
        </option>
      </select>
    </div>
    <div class="tabla-container">
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
          <tr v-for="(valores, key) in datosFiltrados" :key="key">
            <td>{{ formatearNombreMetric(key) }}</td>
            <td>{{ valores.Mean.toFixed(2) }}</td>
            <td>{{ valores.Std.toFixed(2) }}</td>
            <td>{{ valores.P25.toFixed(2) }}</td>
            <td>{{ valores.P50.toFixed(2) }}</td>
            <td>{{ valores.P75.toFixed(2) }}</td>
            <td>{{ valores.Max.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useCargadorDatos } from '../../composables/useCargadorDatos';

export default {
  name: 'TablaOHLC',
  props: {
    temporalidad: {
      type: String,
      default: 'diario',
      validator: value => ['diario', 'semanal', 'mensual'].includes(value)
    }
  },
  setup(props) {
    const { datos } = useCargadorDatos();
    const metricSeleccionada = ref('higher_extension');

    const temporalidadFormateada = computed(() => {
      return {
        diario: 'Diario',
        semanal: 'Semanal',
        mensual: 'Mensual'
      }[props.temporalidad];
    });

    const metricDisponibles = computed(() => {
      return [
        'higher_extension',
        'lower_extension',
        'high_fade',
        'low_fade'
      ];
    });

    const datosFiltrados = computed(() => {
      const datosTemporales = datos.value.ohlc[props.temporalidad];
      return {
        [metricSeleccionada.value]: datosTemporales[metricSeleccionada.value]
      };
    });

    const formatearNombreMetric = (metric) => {
      const nombres = {
        higher_extension: 'Extensión Superior',
        lower_extension: 'Extensión Inferior',
        high_fade: 'High Fade',
        low_fade: 'Low Fade'
      };
      return nombres[metric] || metric;
    };

    return {
      metricSeleccionada,
      metricDisponibles,
      datosFiltrados,
      temporalidadFormateada,
      formatearNombreMetric
    };
  }
};
</script>

<style scoped>
.tarjeta-tabla {
  border: 1px solid #d6d3d1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-top: 0;
  color: #292524;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.filtros {
  margin-bottom: 16px;
}

.selector {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #d6d3d1;
  background-color: white;
  color: #292524;
}

.tabla-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e7e5e4;
}

th {
  background-color: #f5f5f4;
  font-weight: 600;
  color: #292524;
}

tr:hover {
  background-color: #fafaf9;
}
</style>