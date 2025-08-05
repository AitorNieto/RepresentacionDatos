<template>
  <div class="filtro-activo">
    <label for="activo" class="etiqueta-filtro">Activo:</label>
    <select 
      id="activo" 
      v-model="activoSeleccionado" 
      @change="cambiarActivo"
      class="selector-filtro"
    >
      <option v-for="activo in activosDisponibles" :key="activo" :value="activo">
        {{ activo }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'FiltroActivo',
  props: {
    modelValue: {
      type: String,
      default: 'EURUSD'
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      activoSeleccionado: this.modelValue,
      activosDisponibles: [
        'EURUSD',
        'GBPUSD',
        'USDJPY',
        'AUDUSD',
        'USDCAD',
        'GOLD',
        'SP500',
        'NASDAQ'
      ]
    }
  },
  watch: {
    modelValue(newVal) {
      this.activoSeleccionado = newVal
    }
  },
  methods: {
    cambiarActivo() {
      this.$emit('update:modelValue', this.activoSeleccionado)
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

.selector-filtro {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #d6d3d1;
  background-color: white;
  color: #292524;
  cursor: pointer;
  min-width: 120px;
}
</style>