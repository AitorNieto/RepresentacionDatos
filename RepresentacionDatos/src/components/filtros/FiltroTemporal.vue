<template>
  <div class="filtro-temporal">
    <label>Temporalidad:</label>
    <select v-model="temporalidadSeleccionada" @change="cambiarTemporalidad">
      <option value="diario">Diario</option>
      <option value="semanal">Semanal</option>
      <option value="mensual">Mensual</option>
    </select>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useCargadorDatos } from '@/composables/useCargadorDatos'

export default {
  name: 'FiltroTemporal',
  setup() {
    const { estado, cambiarTemporalidad } = useCargadorDatos()
    
    const temporalidadSeleccionada = computed({
      get: () => estado.temporalidad,
      set: (nuevaTemp) => cambiarTemporalidad(nuevaTemp)
    })

    return {
      temporalidadSeleccionada,
      cambiarTemporalidad
    }
  }
}
</script>

<style scoped>
.filtro-temporal {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>