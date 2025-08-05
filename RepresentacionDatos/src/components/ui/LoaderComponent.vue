<template>
  <div class="loader-overlay" v-if="mostrar">
    <div class="loader-container">
      <div class="loader"></div>
      <p class="loader-text">{{ texto || 'Cargando datos...' }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoaderComponent',
  props: {
    mostrar: {
      type: Boolean,
      default: false
    },
    texto: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loader-container {
  text-align: center;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loader-text {
  color: #3b82f6;
  font-weight: 500;
}
</style>