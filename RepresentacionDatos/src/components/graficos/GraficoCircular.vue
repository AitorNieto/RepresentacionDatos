<template>
  <div ref="contenedorGrafico" class="grafico-circular"></div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import * as echarts from 'echarts'
import { useCargadorDatos } from '@/composables/useCargadorDatos'

export default {
  name: 'GraficoCircular',
  setup() {
    const contenedorGrafico = ref(null)
    const { datosDireccionMercado } = useCargadorDatos()
    let miGrafico = null

    const inicializarGrafico = () => {
      if (contenedorGrafico.value) {
        miGrafico = echarts.init(contenedorGrafico.value)
        actualizarGrafico()
      }
    }

    const actualizarGrafico = () => {
      const opciones = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'center'
        },
        series: [{
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
          data: datosDireccionMercado.value || [], // Usamos el valor computado
          color: ['#16a34a', '#dc2626']
        }]
      }

      miGrafico.setOption(opciones)
    }

    onMounted(() => {
      inicializarGrafico()
      window.addEventListener('resize', () => miGrafico?.resize())
    })

    onBeforeUnmount(() => {
      miGrafico?.dispose()
      window.removeEventListener('resize', () => miGrafico?.resize())
    })

    return { contenedorGrafico }
  }
}
</script>

<style scoped>
.grafico-circular {
  width: 100%;
  height: 400px;
}
</style>