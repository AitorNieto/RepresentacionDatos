<template>
  <div class="configuracion-grafico">
    <button @click="mostrarConfig = !mostrarConfig" class="boton-config">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    </button>

    <ModalDetalles 
      v-model:mostrar="mostrarConfig" 
      titulo="Configuración del Gráfico"
      ancho="500px"
    >
      <div class="opciones-config">
        <div class="opcion-config">
          <label class="etiqueta-opcion">Tipo de Gráfico:</label>
          <select v-model="config.tipo" class="selector-opcion">
            <option value="barra">Barras</option>
            <option value="linea">Líneas</option>
            <option value="area">Área</option>
          </select>
        </div>

        <div class="opcion-config">
          <label class="etiqueta-opcion">Mostrar Leyenda:</label>
          <input type="checkbox" v-model="config.mostrarLeyenda" class="checkbox-opcion">
        </div>

        <div class="opcion-config">
          <label class="etiqueta-opcion">Color Principal:</label>
          <input type="color" v-model="config.colorPrincipal" class="color-opcion">
        </div>

        <div class="opcion-config">
          <label class="etiqueta-opcion">Color Secundario:</label>
          <input type="color" v-model="config.colorSecundario" class="color-opcion">
        </div>
      </div>

      <template #footer>
        <button @click="aplicarConfig" class="boton-primario">
          Aplicar
        </button>
        <button @click="mostrarConfig = false" class="boton-secundario">
          Cancelar
        </button>
      </template>
    </ModalDetalles>
  </div>
</template>

<script>
import { ref } from 'vue'
import ModalDetalles from '../ui/ModalDetalles.vue'

export default {
  name: 'ConfiguracionGrafico',
  components: {
    ModalDetalles
  },
  props: {
    configInicial: {
      type: Object,
      default: () => ({
        tipo: 'barra',
        mostrarLeyenda: true,
        colorPrincipal: '#3b82f6',
        colorSecundario: '#ea580c'
      })
    }
  },
  setup(props, { emit }) {
    const mostrarConfig = ref(false)
    const config = ref({ ...props.configInicial })

    const aplicarConfig = () => {
      emit('config-cambiada', config.value)
      mostrarConfig.value = false
    }

    return {
      mostrarConfig,
      config,
      aplicarConfig
    }
  }
}
</script>

<style scoped>
.configuracion-grafico {
  display: inline-block;
}

.boton-config {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  color: #64748b;
}

.boton-config:hover {
  background-color: #f5f5f4;
  color: #3b82f6;
}

.opciones-config {
  display: grid;
  gap: 16px;
}

.opcion-config {
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  gap: 12px;
}

.etiqueta-opcion {
  font-weight: 500;
  color: #57534e;
}

.selector-opcion {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #d6d3d1;
  background-color: white;
  color: #292524;
}

.checkbox-opcion {
  width: 18px;
  height: 18px;
}

.color-opcion {
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
}

.boton-primario {
  padding: 8px 16px;
  background-color: #3b82f6;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.boton-primario:hover {
  background-color: #2563eb;
}
</style>