<template>
  <div class="panel-principal">
    <header class="barra-superior">
      <div class="logo">
        <span>Visualizador Financiero</span>
      </div>
      <nav class="navegacion">
        <button 
          class="boton-nav" 
          :class="{ 'activo': seccionActiva === 'adquisicion' }" 
          @click="navegar('adquisicion')"
        >
          Adquisición de datos
        </button>
        <button 
          class="boton-nav" 
          :class="{ 'activo': seccionActiva === 'visualizacion' }" 
          @click="navegar('visualizacion')"
        >
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
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'PanelPrincipal',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const seccionActiva = ref('visualizacion');

    const navegar = (seccion) => {
      seccionActiva.value = seccion;
      if (seccion === 'adquisicion') {
        router.push('/adquisicion');
      } else if (seccion === 'visualizacion') {
        router.push('/visualizacion');
      }
    };

    // Actualiza la sección activa según la ruta actual
    watch(
      () => route.path,
      (nuevaRuta) => {
        if (nuevaRuta.includes('adquisicion')) {
          seccionActiva.value = 'adquisicion';
        } else if (nuevaRuta.includes('visualizacion')) {
          seccionActiva.value = 'visualizacion';
        }
      },
      { immediate: true }
    );

    return {
      seccionActiva,
      navegar,
    };
  },
};
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