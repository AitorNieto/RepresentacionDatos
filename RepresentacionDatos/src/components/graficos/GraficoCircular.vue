 <template>
  <div class="grafico-container">
    <div v-if="!hayDatos" class="sin-datos">
      No hay datos de dirección disponibles
    </div>
    <div v-else ref="contenedorGrafico" class="grafico-circular"></div>
  </div>
</template>

<script>
import { ref, onMounted, watch, onBeforeUnmount, computed, nextTick } from 'vue'
import * as echarts from 'echarts'
import { useCargadorDatos } from '@/composables/useCargadorDatos'

export default {
  name: 'GraficoCircular',
  setup() {
    const contenedorGrafico = ref(null)
    const { datosDireccionMercado, estado } = useCargadorDatos()
    let miGrafico = null

    const hayDatos = computed(() => {
      const datos = datosDireccionMercado.value
      return datos.some(item => item.value > 0)
    })

    const inicializarGrafico = async () => {
      await nextTick()
      if (contenedorGrafico.value && !miGrafico && hayDatos.value) {
        miGrafico = echarts.init(contenedorGrafico.value)
        actualizarGrafico()
        window.addEventListener('resize', redimensionarGrafico)
      }
    }

    const actualizarGrafico = () => {
      if (!miGrafico || !hayDatos.value) return

      const datos = datosDireccionMercado.value
      console.log('Datos gráfico circular:', datos)

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
          radius: ['40%', '70%'],
          center: ['40%', '50%'],
          data: datos,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: { 
            show: true,
            formatter: '{b}: {d}%',
            fontSize: 12
          },
          emphasis: {
            label: { 
              show: true, 
              fontSize: 16, 
              fontWeight: 'bold' 
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          color: ['#10b981', '#ef4444']
        }]
      }

      miGrafico.setOption(opciones, true)
    }

    const redimensionarGrafico = () => {
      if (miGrafico) {
        miGrafico.resize()
      }
    }

    onMounted(() => {
      if (!estado.cargando && hayDatos.value) {
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

    watch([datosDireccionMercado, hayDatos], () => {
      if (miGrafico && hayDatos.value) {
        actualizarGrafico()
      } else if (!hayDatos.value && miGrafico) {
        miGrafico.dispose()
        miGrafico = null
      } else if (hayDatos.value && !miGrafico) {
        inicializarGrafico()
      }
    }, { deep: true })

    return { 
      contenedorGrafico,
      hayDatos
    }
  }
}
</script>

<style scoped>
.grafico-container {
  width: 100%;
  height: 350px;
  position: relative;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 16px 0;
}

.grafico-circular {
  width: 100%;
  height: 100%;
}

.sin-datos {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #64748b;
  font-style: italic;
}
</style>
