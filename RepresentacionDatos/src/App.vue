<template>
  <div id="app" class="app-background">
    <PreHome v-if="mostrarPreHome" />
    <div v-else class="app-layout">
      <Menu />
      <div class="contenido-principal">
        <PanelPrincipal>
          <router-view />
        </PanelPrincipal>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import PanelPrincipal from '@/components/diseno/PanelPrincipal.vue';
import Menu from '@/components/Menu.vue';
import PreHome from '@/components/PreHome.vue';

export default defineComponent({
  name: 'App',
  components: {
    PanelPrincipal,
    Menu,
    PreHome,
  },
  setup() {
    const mostrarPreHome = ref(true);

    onMounted(() => {
      setTimeout(() => {
        mostrarPreHome.value = false;
      }, 2000); // Mostrar el PreHome durante 2 segundos
    });

    return {
      mostrarPreHome,
    };
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

.app-background {
  background-color: #ffc0cb; /* Fondo rosa aplicado */
}

.app-layout {
  display: flex;
  height: 100%;
  width: 100%;
}

.contenido-principal {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: transparent; /* Fondo transparente para mostrar el fondo rosa */
}
</style>