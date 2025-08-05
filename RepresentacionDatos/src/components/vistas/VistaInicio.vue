<template>
  <div class="vista-inicio">
    <!-- Loader global -->
    <div v-if="estado.cargando" class="loader-global">
      <div class="spinner"></div>
      <p>Cargando datos financieros...</p>
    </div>

    <!-- Error global -->
    <div v-else-if="estado.error" class="error-global">
      <h3>Error al cargar datos</h3>
      <p>{{ estado.error }}</p>
      <button @click="recargarDatos" class="boton-reintentar">
        Reintentar
      </button>
    </div>

    <!-- Contenido principal -->
    <template v-else>
      <div class="controles">
        <FiltroActivo />
        <FiltroTemporal />
        <div class="info-estado">
          <span>Activo: <strong>{{ estado.activo }}</strong></span>
          <span>Temporalidad: <strong>{{ temporalidadFormateada }}</strong></span>
        </div>
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
    </template>
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
    const { estado, recargarDatos } = useCargadorDatos()

    const temporalidadFormateada = computed(() => {
      return {
        diario: 'Diario',
        semanal: 'Semanal',
        mensual: 'Mensual'
      }[estado.temporalidad] || 'Diario'
    })

    return {
      estado,
      temporalidadFormateada,
      recargarDatos
    }
  }
}
</script>

<style scoped>
.vista-inicio {
  padding: 20px;
  min-height: 100vh;
}

.loader-global {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  gap: 20px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-global {
  text-align: center;
  padding: 40px;
  color: #dc2626;
}

.boton-reintentar {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.boton-reintentar:hover {
  background-color: #2563eb;
}

.controles {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.info-estado {
  display: flex;
  gap: 15px;
  margin-left: auto;
  font-size: 0.9rem;
  color: #64748b;
}

.info-estado span {
  background-color: #f1f5f9;
  padding: 4px 8px;
  border-radius: 4px;
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
    align-items: flex-start;
    gap: 10px;
  }

  .info-estado {
    margin-left: 0;
    margin-top: 10px;
  }
}
</style>