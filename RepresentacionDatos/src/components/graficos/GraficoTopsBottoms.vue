<template>
  <div ref="contenedorGrafico" class="grafico-tops-bottoms"></div>
</template>

<script>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { useCargadorDatos } from '@/composables/useCargadorDatos'

export default {
  name: 'GraficoTopsBottoms',
  props: {
    temporalidad: {
      type: String,
      default: 'diario'
    }
  },
  setup(props) {
    const contenedorGrafico = ref(null)
    const { procesarDatosPivotes } = useCargadorDatos()
    let miGrafico = null

    const inicializarGrafico = () => {
      if (contenedorGrafico.value) {
        miGrafico = echarts.init(contenedorGrafico.value)
        actualizarGrafico()
      }
    }

    const actualizarGrafico = () => {
      const { tops, bottoms } = procesarDatosPivotes.value

      const opciones = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: params => {
            const tipo = params[0].seriesName
            const valor = Math.abs(params[0].value).toFixed(2)
            const etiqueta = params[0].axisValue
            return `${tipo}<br/>${etiqueta}: ${valor}`
          }
        },
        legend: {
          data: ['Tops', 'Bottoms']
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
          axisLabel: {
            rotate: 45,
            interval: props.temporalidad === 'diario' ? 3 : 0
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: value => Math.abs(value)
          }
        },
        series: [
          {
            name: 'Tops',
            type: 'bar',
            data: tops.map(item => item.valor),
            itemStyle: { color: '#3b82f6' }
          },
          {
            name: 'Bottoms',
            type: 'bar',
            data: bottoms.map(item => item.valor),
            itemStyle: { color: '#ef4444' }
          }
        ]
      }

      miGrafico.setOption(opciones, true)
    }

    const redimensionarGrafico = () => {
      miGrafico?.resize()
    }

    onMounted(() => {
      inicializarGrafico()
      window.addEventListener('resize', redimensionarGrafico)
    })

    onBeforeUnmount(() => {
      miGrafico?.dispose()
      window.removeEventListener('resize', redimensionarGrafico)
    })

    watch([() => procesarDatosPivotes.value, () => props.temporalidad], () => {
      actualizarGrafico()
    })

    return { contenedorGrafico }
  }
}
</script>

<style scoped>
.grafico-tops-bottoms {
  width: 100%;
  height: 400px;
}
</style>