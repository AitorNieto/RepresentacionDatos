<template>
  <div class="filtro-activo">
    <label>Activo:</label>
    <select 
      v-model="activoSeleccionado" 
      @change="cambiarActivo"
      :disabled="!activosDisponibles.length"
    >
      <option 
        v-for="activo in activosDisponibles" 
        :key="activo" 
        :value="activo"
      >
        {{ activo }}
      </option>
    </select>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useCargadorDatos } from '@/composables/useCargadorDatos'

export default {
  name: 'FiltroActivo',
  setup() {
    const { estado, cambiarActivo } = useCargadorDatos()
    
    const activosDisponibles = computed(() => estado.activosDisponibles || [])
    const activoSeleccionado = computed({
      get: () => estado.activo,
      set: (nuevoActivo) => cambiarActivo(nuevoActivo)
    })

    return {
      activoSeleccionado,
      activosDisponibles,
      cambiarActivo
    }
  }
}
</script>

<style scoped>
.filtro-activo {
  display: flex;
  align-items: center;
  gap: 8px;
}

select {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  min-width: 120px;
}
</style>