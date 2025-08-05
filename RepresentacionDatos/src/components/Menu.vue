<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCargadorDatos } from '@/composables/useCargadorDatos';

const router = useRouter();
const { cambiarTemporalidad, estado } = useCargadorDatos();
const menuAbierto = ref(false);

function navigate(route) {
  router.push(route);
  menuAbierto.value = false; // Cierra el menú en móviles al navegar
}

function actualizarTemporalidad(event) {
  cambiarTemporalidad(event.target.value);
}
</script>

<template>
  <aside :class="['menu', { abierto: menuAbierto }]">
    <button class="toggle-menu" @click="menuAbierto = !menuAbierto">
      ☰
    </button>
    <nav>
      <ul>
        <li>
          <a @click.prevent="navigate('/inicio')" class="menu-item">
            🏠 Inicio
          </a>
        </li>
        <li>
          <span class="apartado">Gráficos</span>
          <ul class="subapartados">
            <li><a @click.prevent="navigate('/grafico/circular')">📊 Distribución Alcista/Bajista</a></li>
            <li><a @click.prevent="navigate('/grafico/tops-bottoms')">🕰️ Tops & Bottoms</a></li>
            <li><a @click.prevent="navigate('/grafico/tabla-ohlc')">📋 Estadísticas OHLC</a></li>
          </ul>
        </li>
        <li>
          <span class="apartado">Filtros</span>
          <ul class="subapartados">
            <li>
              <label for="temporalidad">Temporalidad:</label>
              <select id="temporalidad" :value="estado.temporalidad" @change="actualizarTemporalidad">
                <option value="diario">Diario</option>
                <option value="semanal">Semanal</option>
                <option value="mensual">Mensual</option>
              </select>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: rgba(16, 77, 107, 0.8);
  color: white;
  padding: 20px;
  z-index: 1001;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.menu.abierto {
  transform: translateX(0);
}

.menu:not(.abierto) {
  transform: translateX(-100%);
}

.toggle-menu {
  display: none;
  position: fixed;
  top: 10px;
  left: 10px;
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  z-index: 1002;
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu > nav > ul > li {
  margin-bottom: 25px;
}

.apartado {
  font-weight: bold;
  font-size: 1.1em;
  display: block;
  margin-bottom: 8px;
}

.subapartados {
  margin-left: 15px;
}

.subapartados li {
  margin: 10px 0;
}

.menu ul li a {
  color: white;
  text-decoration: none;
  cursor: pointer;
  font-weight: normal;
}

.menu ul li a:hover {
  color: #00e1ff;
}

select {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
  color: #292524;
  width: 100%;
}

.menu-item {
  display: block;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  padding: 10px 15px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #334155;
}

@media (max-width: 768px) {
  .menu {
    width: 100%;
    height: auto;
    transform: translateY(-100%);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1001;
  }

  .menu.abierto {
    transform: translateY(0);
  }

  .toggle-menu {
    display: block;
  }
}

@media (min-width: 769px) {
  .menu {
    transform: translateX(0);
  }

  .toggle-menu {
    display: none;
  }
}
</style>
