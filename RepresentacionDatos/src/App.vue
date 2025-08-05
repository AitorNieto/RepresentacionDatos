<template>
  <div id="app">
    <PanelPrincipal>
      <VistaInicio />
    </PanelPrincipal>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import PanelPrincipal from '@/components/diseno/PanelPrincipal.vue'
import VistaInicio from './components/vistas/VistaInicio.vue'

export default defineComponent({
  name: 'App',
  components: {
    PanelPrincipal,
    VistaInicio
  }
})
</script>

<style>
/* Estilos globales si los necesitas */
</style>