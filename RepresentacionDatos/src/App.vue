<template>
  <div id="app">
    <PanelPrincipal>
      <VistaInicio />
    </PanelPrincipal>
  </div>
</template>

<script>
import PanelPrincipal from '@/components/diseno/PanelPrincipal.vue'
import VistaInicio from '@/components/vistas/VistaInicio.vue'

export default {
  name: 'App',
  components: {
    PanelPrincipal,
    VistaInicio
  }
}
</script>

<style>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #292524;
  min-height: 100vh;
  background-color: #f5f5f4;
}
</style>