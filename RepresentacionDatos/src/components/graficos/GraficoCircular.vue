<template>
  <div class="tarjeta-grafico">
    <h3>Distribución Alcista/Bajista</h3>
    <div ref="contenedorGrafico" class="grafico-container"></div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import * as echarts from 'echarts';
import { useCargadorDatos } from '@/composables/useCargadorDatos'

export default {
  name: 'GraficoCircular',
  setup() {
    const { datos } = useCargadorDatos();
    const contenedorGrafico = ref(null);
    let miGrafico = null;

    const datosGrafico = computed(() => {
      return [
        { value: datos.value.ohlc.direction.Bullish, name: 'Alcista' },
        { value: datos.value.ohlc.direction.Bearish, name: 'Bajista' }
      ];
    });

    const inicializarGrafico = () => {
      if (contenedorGrafico.value) {
        miGrafico = echarts.init(contenedorGrafico.value);
        actualizarGrafico();
        window.addEventListener('resize', redimensionarGrafico);
      }
    };

    const redimensionarGrafico = () => {
      if (miGrafico) {
        miGrafico.resize();
      }
    };

    const actualizarGrafico = () => {
      const opciones = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'center',
          textStyle: { color: '#292524' }
        },
        series: [
          {
            name: 'Distribución',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '18',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: datosGrafico.value,
            color: ['#16a34a', '#dc2626']
          }
        ]
      };

      miGrafico.setOption(opciones);
    };

    onMounted(inicializarGrafico);

    return { contenedorGrafico };
  }
};
</script>

<style scoped>
.grafico-container {
  width: 100%;
  height: 350px;
}
</style>