<template>
  <div class="vista-inicio">
    <div class="cabecera">
      <h1>Visualizador de Datos Financieros</h1>
      <div class="filtros-superiores">
        <FiltroActivo v-model="activoSeleccionado" />
        <FiltroTemporal v-model="temporalidadSeleccionada" />
      </div>
    </div>

     <TarjetaGrafico titulo="Distribución Alcista/Bajista">
      <GraficoCircular />
    </TarjetaGrafico>

    <TarjetaGrafico :titulo="`Tops y Bottoms - ${temporalidadFormateada}`">
      <GraficoTopsBottoms :temporalidad="temporalidadSeleccionada" />
    </TarjetaGrafico>

    <TarjetaGrafico :titulo="`Estadísticas OHLC - ${temporalidadFormateada}`">
      <TablaOHLC :temporalidad="temporalidadSeleccionada" />
    </TarjetaGrafico>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import FiltroActivo from '@/components/filtros/FiltroActivo.vue'
import FiltroTemporal from '@/components/filtros/FiltroTemporal.vue'
import TarjetaGrafico from '@/components/diseno/TarjetaGrafico.vue'
import GraficoCircular from '@/components/graficos/GraficoCircular.vue'
import GraficoTopsBottoms from '@/components/graficos/GraficoTopsBottoms.vue'
import TablaOHCL from '@/components/graficos/TablaOHLC.vue'

export default {
  name: 'VistaInicio',
  components: {
    FiltroActivo,
    FiltroTemporal,
    TarjetaGrafico,
    GraficoCircular,
    GraficoTopsBottoms,
    TablaOHCL
  },
  setup() {
    const activoSeleccionado = ref('EURUSD')
    const temporalidadSeleccionada = ref('diario')

    const temporalidadFormateada = computed(() => {
      return {
        diario: 'Diario',
        semanal: 'Semanal',
        mensual: 'Mensual'
      }[temporalidadSeleccionada.value]
    })

    return {
      activoSeleccionado,
      temporalidadSeleccionada,
      temporalidadFormateada
    }
  }
}
</script>

<style scoped>
.vista-inicio {
  padding: 20px;
}

.cabecera {
  margin-bottom: 30px;
}

.cabecera h1 {
  margin-bottom: 20px;
  color: #292524;
  font-size: 1.8rem;
}

.filtros-superiores {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.contenido-principal {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .contenido-principal {
    grid-template-columns: 1fr;
  }
  
  .filtros-superiores {
    flex-direction: column;
    gap: 10px;
  }
}
</style>