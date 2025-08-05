<template>
  <div class="grafico-container">
    <div v-if="estado.cargando" class="loading">Cargando datos...</div>
    <div v-else-if="estado.error" class="error">{{ estado.error }}</div>
    <div v-else ref="contenedorGrafico" class="grafico-tops-bottoms"></div>
  </div>
</template>

<script>
import { ref, onMounted, watch, onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts'
import { useCargadorDatos } from '@/composables/useCargadorDatos'

export default {
  name: 'GraficoTopsBottoms',
  setup() {
    const contenedorGrafico = ref(null)
    const { procesarDatosPivotes, estado } = useCargadorDatos()
    let miGrafico = null

    const inicializarGrafico = async () => {
      await nextTick()
      if (contenedorGrafico.value && !miGrafico) {
        miGrafico = echarts.init(contenedorGrafico.value)
        actualizarGrafico()

        // Listener para redimensionar
        window.addEventListener('resize', redimensionarGrafico)
      }
    }

    const actualizarGrafico = () => {
      if (!miGrafico) return

      const datos = procesarDatosPivotes.value
      console.log('Actualizando gráfico con datos:', datos)

      if (!datos.tops.length && !datos.bottoms.length) {
        miGrafico.setOption({
          title: {
            text: 'No hay datos disponibles',
            left: 'center',
            top: 'center'
          },
          xAxis: { type: 'category', data: [] },
          yAxis: { type: 'value' },
          series: []
        }, true)
        return
      }

      const opciones = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: params => {
            if (!params || !params.length) return ''
            const param = params[0]
            const tipo = param.seriesName
            const valor = Math.abs(param.value).toFixed(2)
            const etiqueta = param.axisValue
            return `${tipo}<br/>${etiqueta}: ${valor}`
          }
        },
        legend: {
          data: ['Tops', 'Bottoms'],
          top: 10
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          top: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: datos.tops.length ? datos.tops.map(item => item.clave) : datos.bottoms.map(item => item.clave),
          axisLabel: {
            rotate: estado.temporalidad === 'diario' ? 45 : 0,
            interval: estado.temporalidad === 'diario' ? 2 : 0
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: value => Math.abs(value).toFixed(0)
          }
        },
        series: [
          {
            name: 'Tops',
            type: 'bar',
            data: datos.tops.map(item => item.valor),
            itemStyle: {
              color: '#10b981',
              borderRadius: [4, 4, 0, 0]
            }
          },
          {
            name: 'Bottoms',
            type: 'bar',
            data: datos.bottoms.map(item => item.valor),
            itemStyle: {
              color: '#ef4444',
              borderRadius: [0, 0, 4, 4]
            }
          }
        ]
      }

      miGrafico.setOption(opciones, true)
    }

    const redimensionarGrafico = () => {
      if (miGrafico) {
        miGrafico.resize()
      }
    }

    onMounted(() => {
      if (!estado.cargando) {
        inicializarGrafico()
      }
    })

    onBeforeUnmount(() => {
      if (miGrafico) {
        miGrafico.dispose()
        window.removeEventListener('resize', redimensionarGrafico)
        miGrafico = null
      }
    })

    // Watch para cambios en los datos y temporalidad
    watch([procesarDatosPivotes, () => estado.temporalidad], () => {
      console.log('Watch activado - temporalidad:', estado.temporalidad)
      if (miGrafico) {
        actualizarGrafico()
      }
    }, { deep: true })

    // Watch para inicializar cuando termine la carga
    watch(() => estado.cargando, (nuevoCargando) => {
      if (!nuevoCargando && !miGrafico) {
        inicializarGrafico()
      }
    })

    return {
      contenedorGrafico,
      estado
    }
  }
}
</script>

<style scoped>
.grafico-container {
  width: 100%;
  height: 400px;
  position: relative;
}

.grafico-tops-bottoms {
  width: 100%;
  height: 100%;
}

.loading, .error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 1.1rem;
}

.error {
  color: #dc2626;
}

.loading {
  color: #3b82f6;
}
</style>