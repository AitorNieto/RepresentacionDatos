<template>
  <div class="tarjeta-grafico">
    <div class="cabecera-tarjeta">
      <h3>{{ titulo }}</h3>
      <div class="acciones-tarjeta">
        <button class="boton-accion" @click="exportarGrafico" title="Exportar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </button>
      </div>
    </div>
    <div class="contenido-tarjeta">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TarjetaGrafico',
  props: {
    titulo: {
      type: String,
      required: true
    }
  },
  methods: {
    exportarGrafico() {
      // Implementar lógica de exportación
      console.log('Exportar gráfico:', this.titulo)
    }
  }
}
</script>

<style scoped>
.tarjeta-grafico {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.cabecera-tarjeta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e7e5e4;
}

.cabecera-tarjeta h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #292524;
}

.acciones-tarjeta {
  display: flex;
  gap: 8px;
}

.boton-accion {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.boton-accion:hover {
  background-color: #f5f5f4;
  color: #3b82f6;
}

.contenido-tarjeta {
  padding: 16px;
}
</style>