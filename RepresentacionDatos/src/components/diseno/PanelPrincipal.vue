<template>
  <div class="panel-principal">
    <header class="barra-superior">
      <div class="logo">
        <span>Visualizador Financiero</span>
      </div>
      <nav class="navegacion">
        <button class="boton-nav" :class="{ 'activo': seccionActiva === 'datos' }">
          Adquisición de datos
        </button>
        <button class="boton-nav" :class="{ 'activo': seccionActiva === 'visualizacion' }">
          Visualizador de datos
        </button>
      </nav>
    </header>
    
    <main class="contenido-panel">
      <slot></slot>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'PanelPrincipal',
  setup() {
    const seccionActiva = ref('visualizacion')

    return {
      seccionActiva
    }
  }
}
</script>

<style scoped>
.panel-principal {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.barra-superior {
  background-color: #1e293b;
  color: white;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.logo {
  font-weight: bold;
  font-size: 1.2rem;
}

.navegacion {
  display: flex;
  gap: 10px;
}

.boton-nav {
  background: none;
  border: none;
  color: #e2e8f0;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.boton-nav:hover {
  background-color: #334155;
}

.boton-nav.activo {
  background-color: #3b82f6;
  color: white;
}

.contenido-panel {
  flex: 1;
  padding: 20px;
  background-color: #f5f5f4;
}
</style>