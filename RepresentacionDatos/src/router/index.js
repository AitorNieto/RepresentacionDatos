import { createRouter, createWebHistory } from 'vue-router';
import GraficoCircular from '@/components/graficos/GraficoCircular.vue';
import GraficoTopsBottoms from '@/components/graficos/GraficoTopsBottoms.vue';
import TablaOHLC from '@/components/graficos/TablaOHLC.vue';
import VistaVisualizacion from '@/components/vistas/VistaVisualizacion.vue';
import PaginaInicio from '@/components/vistas/PaginaInicio.vue';

const routes = [
  { path: '/', redirect: '/inicio' },
  { path: '/inicio', component: PaginaInicio },
  { path: '/visualizacion', component: VistaVisualizacion },
  { path: '/grafico/circular', component: GraficoCircular },
  { path: '/grafico/tops-bottoms', component: GraficoTopsBottoms },
  { path: '/grafico/tabla-ohlc', component: TablaOHLC },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

