<template>
  <div class="vista-visualizacion">
    <h2>Visualizador de datos</h2>

    <div class="resumen">
      <h3>Distribución Alcista/Bajista</h3>
      <GraficoCircular />
    </div>

    <div class="resumen">
      <h3>Estadísticas OHLC</h3>
      <TablaOHLC />
    </div>
  </div>
</template>

<script>
import GraficoCircular from '@/components/graficos/GraficoCircular.vue';
import TablaOHLC from '@/components/graficos/TablaOHLC.vue';

export default {
  name: 'VistaVisualizacion',
  components: {
    GraficoCircular,
    TablaOHLC,
  },
};
</script>

<style scoped>
.vista-visualizacion {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.resumen {
  margin-bottom: 20px;
}
</style>
