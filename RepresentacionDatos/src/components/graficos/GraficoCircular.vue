<template>
  <div class="grafico-container">
    <div v-if="!hayDatos" class="sin-datos">
      No hay datos de dirección disponibles
    </div>
    <div v-else ref="contenedorGrafico" class="grafico-circular"></div>
  </div>
</template>

<script>
import { ref, onMounted, watch, onBeforeUnmount, computed, nextTick } from 'vue'
import * as echarts from 'echarts'
import { useCargadorDatos } from '@/composables/useCargadorDatos'

export default {
  name: 'GraficoCircular',
  setup() {
    const contenedorGrafico = ref(null)
    const { datosDireccionMercado, estado } = useCargadorDatos()
    let miGrafico = null

    const hayDatos = computed(() => {
      const datos = datosDireccionMercado.value
      return datos.some(item => item.value > 0)
    })

    const inicializarGrafico = async () => {
      await nextTick()
      if (contenedorGrafico.value && !miGrafico && hayDatos.value) {
        miGrafico = echarts.init(contenedorGrafico.value)
        actualizarGrafico()
        window.addEventListener('resize', redimensionarGrafico)
      }
    }

    const actualizarGrafico = () => {
      if (!miGrafico || !hayDatos.value) return

      const datos = datosDireccionMercado.value
      console.log('Datos gráfico circular:', datos)

      const opciones = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'center'
        },
        series: [{
          name: 'Distribución',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['40%', '50%'],
          data: datos,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: { 
            show: true,
            formatter: '{b}: {d}%',