<template>
  <div class="grafico-container">
    <div ref="contenedorGrafico" class="grafico"></div>
  </div>
</template>

<script>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import { useCargadorDatos } from '@/composables/useCargadorDatos';

export default {
  name: 'GraficoTopsBottoms',
  props: {
    temporalidad: {
      type: String,
      default: 'diario',
      validator: value => ['diario', 'semanal', 'mensual'].includes(value)
    }
  },
  setup(props) {
    const contenedorGrafico = ref(null);
    const { procesarDatosPivotes } = useCargadorDatos();
    let miGrafico = null;

    const inicializarGrafico = () => {
      if (contenedorGrafico.value) {
        miGrafico = echarts.init(contenedorGrafico.value);
        actualizarGrafico();
      }
    };

    const actualizarGrafico = () => {
      const { tops, bottoms } = procesarDatosPivotes(props.temporalidad);

      const opciones = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: params => {
            const tipo = params[0].seriesName;
            const valor = Math.abs(params[0].value).toFixed(2);
            const etiqueta = params[0].axisValue;
            return `${tipo}<br/>${etiqueta}: ${valor}`;
          }
        },
        legend: {
          data: ['Tops', 'Bottoms'],
          textStyle: { color: '#333' }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: tops.map(item => item.clave),
          axisLine: { lineStyle: { color: '#ddd' } },
          axisLabel: { color: '#666' }
        },
        yAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: '#ddd' } },
          axisLabel: { 
            color: '#666',
            formatter: value => Math.abs(value)
          },
          splitLine: { lineStyle: { color: '#eee' } }
        },
        series: [
          {
            name: 'Tops',
            type: 'bar',
            data: tops.map(item => item.valor),
            itemStyle: {
              color: '#3b82f6',
              borderRadius: [4, 4, 0, 0]
            },
            label: {
              show: true,
              position: 'top',
              formatter: ({ value }) => Math.abs(value).toFixed(1)
            }
          },
          {
            name: 'Bottoms',
            type: 'bar',
            data: bottoms.map(item => item.valor),
            itemStyle: {
              color: '#ef4444',
              borderRadius: [0, 0, 4, 4]
            },
            label: {
              show: true,
              position: 'bottom',
              formatter: ({ value }) => Math.abs(value).toFixed(1)
            }
          }
        ]
      };

      miGrafico.setOption(opciones);
      miGrafico.resize(); // Asegura el redimensionado
    };

    const redimensionarGrafico = () => {
      if (miGrafico) {
        miGrafico.resize();
      }
    };

    onMounted(() => {
      inicializarGrafico();
      window.addEventListener('resize', redimensionarGrafico);
    });

    onBeforeUnmount(() => {
      if (miGrafico) {
        miGrafico.dispose();
        window.removeEventListener('resize', redimensionarGrafico);
      }
    });

    watch(() => props.temporalidad, () => {
      if (miGrafico) {
        actualizarGrafico();
      }
    });

    return { contenedorGrafico };
  }
};
</script>

<style scoped>
.grafico-container {
  width: 100%;
  height: 100%;
}

.grafico {
  width: 100%;
  height: 400px;
}
</style>