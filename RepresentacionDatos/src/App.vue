<template>
  <div id="app">
    <Menu />
    <div class="contenido-principal">
      <PanelPrincipal>
        <router-view />
      </PanelPrincipal>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import PanelPrincipal from '@/components/diseno/PanelPrincipal.vue';
import Menu from '@/components/Menu.vue';

export default defineComponent({
  name: 'App',
  components: {
    PanelPrincipal,
    Menu,
  },
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
}

#app {
  display: flex;
  min-height: 100vh;
}

.contenido-principal {
  flex: 1;
  margin-left: 250px; /* Ancho del menú */
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  #app {
    flex-direction: column;
  }

  .contenido-principal {
    margin-left: 0;
  }
}
</style>