<template>
  <div class="vista-adquisicion">
    <h2>Adquisición de datos</h2>
    <p v-if="estado.cargando">Cargando datos... Por favor, espera.</p>
    <p v-else-if="estado.error" class="error">{{ estado.error }}</p>
    <p v-else>Datos cargados correctamente.</p>

    <div v-if="!estado.cargando && !estado.error">
      <h3>Activos disponibles:</h3>
      <ul>
        <li v-for="activo in estado.activosDisponibles" :key="activo">{{ activo }}</li>
      </ul>
    </div>

    <button @click="recargarDatos" :disabled="estado.cargando" class="boton-recargar">
      Recargar datos
    </button>
  </div>
</template>

<script>
import { useCargadorDatos } from '@/composables/useCargadorDatos';

export default {
  name: 'VistaAdquisicion',
  setup() {
    const { estado, recargarDatos } = useCargadorDatos();

    return {
      estado,
      recargarDatos,
    };
  },
};
</script>

<style scoped>
.vista-adquisicion {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.error {
  color: #dc2626;
}

.boton-recargar {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.boton-recargar:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}
</style>
