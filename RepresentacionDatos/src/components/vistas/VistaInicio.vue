<template>
  <div class="vista-inicio">
    <div class="controles">
      <FiltroActivo />
      <FiltroTemporal />
    </div>

    <div class="graficos-container">
      <TarjetaGrafico titulo="Distribución Alcista/Bajista">
        <GraficoCircular />
      </TarjetaGrafico>

      <TarjetaGrafico :titulo="`Tops y Bottoms - ${temporalidadFormateada}`">
        <GraficoTopsBottoms />
      </TarjetaGrafico>

      <TarjetaGrafico :titulo="`Estadísticas OHLC - ${temporalidadFormateada}`">
        <TablaOHLC />
      </TarjetaGrafico>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useCargadorDatos } from '@/composables/useCargadorDatos'
import FiltroActivo from '@/components/filtros/FiltroActivo.vue'
import FiltroTemporal from '@/components/filtros/FiltroTemporal.vue'
import TarjetaGrafico from '@/components/diseno/TarjetaGrafico.vue'
import GraficoCircular from '@/components/graficos/GraficoCircular.vue'
import GraficoTopsBottoms from '@/components/graficos/GraficoTopsBottoms.vue'
import TablaOHLC from '@/components/graficos/TablaOHLC.vue'

export default {
  name: 'VistaInicio',
  components: {
    FiltroActivo,
    FiltroTemporal,
    TarjetaGrafico,
    GraficoCircular,
    GraficoTopsBottoms,
    TablaOHLC
  },
  setup() {
    const { estado } = useCargadorDatos()

    const temporalidadFormateada = computed(() => {
      return {
        diario: 'Diario',
        semanal: 'Semanal',
        mensual: 'Mensual'
      }[estado.temporalidad] || 'Diario'
    })

    return {
      temporalidadFormateada
    }
  }
}
</script>

<style scoped>
.vista-inicio {
  padding: 20px;
}

.controles {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.graficos-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .graficos-container {
    grid-template-columns: 1fr;
  }
  
  .controles {
    flex-direction: column;
    gap: 10px;
  }
}
</style>