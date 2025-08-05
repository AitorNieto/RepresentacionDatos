<script setup>
import { ref } from 'vue';
const emit = defineEmits(['navigate']);

function navigate(section) {
  emit('navigate', section);
}

function handleLogout() {
  alert("Sesión cerrada correctamente (simulado).");
  emit('navigate', 'login');
}

// Controla qué dropdown está abierto
const openDropdown = ref('');

function toggleDropdown(name) {
  openDropdown.value = openDropdown.value === name ? '' : name;
}
</script>

<template>
  <aside class="menu">
    <nav>
      <ul>
        <li>
          <span class="apartado">Cuenta</span>
          <ul class="subapartados">
            <li><a href="#" @click="navigate('sub1a')">🙍 Usuario</a></li>
          </ul>
        </li>
        <li>
          <span class="apartado">Graficos</span>
          <ul class="subapartados">
            <li><a href="#" @click="navigate('sub2a')">🔒 Open & Close</a></li>
            <li><a href="#" @click="navigate('sub2b')">📈 Range & Volume</a></li>
            <li><a href="#" @click="navigate('sub2c')">📊 Change Moves</a></li>
            <li><a href="#" @click="navigate('sub2b')">✅​ Tests & Breacks</a></li>
            <li><a href="#" @click="navigate('sub2b')">🕰️​ Tops & Bottoms</a></li>
          </ul>
        </li>
        <li>
          <hr class="menu-separator" />
        </li>
        <!-- Subapartados desplegables -->
        <li>
          <span class="apartado">Simbolo</span>
          <ul class="subapartados">
            <li>
              <button class="dropdown-btn" @click="toggleDropdown('simbolo')">
                Opciones Simbolo
              </button>
              <ul v-if="openDropdown === 'simbolo'" class="dropdown-list">
                <li><a href="#" @click="navigate('simbolo1')">Simbolo 1</a></li>
                <li><a href="#" @click="navigate('simbolo2')">Simbolo 2</a></li>
                <li><a href="#" @click="navigate('simbolo3')">Simbolo 3</a></li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <span class="apartado">Temporada</span>
          <ul class="subapartados">
            <li>
              <button class="dropdown-btn" @click="toggleDropdown('temporada')">
                Opciones Temporada
              </button>
              <ul v-if="openDropdown === 'temporada'" class="dropdown-list">
                <li><a href="#" @click="navigate('temporada1')">Diario</a></li>
                <li><a href="#" @click="navigate('temporada2')">Semanal</a></li>
                <li><a href="#" @click="navigate('temporada3')">Mensual</a></li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <span class="apartado">Metrica</span>
          <ul class="subapartados">
            <li>
              <button class="dropdown-btn" @click="toggleDropdown('metrica')">
                Opciones Metrica
              </button>
              <ul v-if="openDropdown === 'metrica'" class="dropdown-list">
                <li><a href="#" @click="navigate('metrica1')">Metrica 1</a></li>
                <li><a href="#" @click="navigate('metrica2')">Metrica 2</a></li>
                <li><a href="#" @click="navigate('metrica3')">Metrica 3</a></li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

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
  margin-left: 35px;
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

.menu-separator {
  border: 2px solid #ffffff55;
  margin: 20px 0;
}

.dropdown-btn {
  background: #14506b;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  text-align: left;
}

.dropdown-list {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 5px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.dropdown-list li {
  margin: 0;
}

.dropdown-list a {
  padding: 10px 15px;
  display: block;
}

.dropdown-list a:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
