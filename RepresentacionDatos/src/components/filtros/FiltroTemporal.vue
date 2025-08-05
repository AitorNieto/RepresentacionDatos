<template>
  <div class="filtro-temporal">
    <label for="temporalidad" class="etiqueta-filtro">Temporalidad:</label>
    <select 
      id="temporalidad" 
      v-model="temporalidadSeleccionada" 
      @change="cambiarTemporalidad"
      class="selector-filtro"
    >
      <option value="diario">Diario</option>
      <option value="semanal">Semanal</option>
      <option value="mensual">Mensual</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'FiltroTemporal',
  props: {
    modelValue: {
      type: String,
      default: 'diario'
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      temporalidadSeleccionada: this.modelValue
    }
  },
  watch: {
    modelValue(newVal) {
      this.temporalidadSeleccionada = newVal
    }
  },
  methods: {
    cambiarTemporalidad() {
      this.$emit('update:modelValue', this.temporalidadSeleccionada)
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

.etiqueta-filtro {
  font-weight: 500;
  color: #57534e;
}

.selector-filtro {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #d6d3d1;
  background-color: white;
  color: #292524;
  cursor: pointer;
  min-width: 120px;
}

.selector-filtro:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}
</style>