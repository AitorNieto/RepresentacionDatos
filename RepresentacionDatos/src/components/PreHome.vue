<template>
  <div class="prehome">
    <div class="spinner">
      <span class="letter">Visualizador De Datos</span>
    </div>
    <div class="footer">
      ©️ 2025 Visualizador De Datos All rights reserved | Design by Aitor Nieto & Guillermo Beltran | Code by Aitor Nieto & Guillermo Beltran
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreHome',
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.prehome {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, rgba(16, 77, 107, 0.8), rgba(16, 77, 107, 1));
  color: white;
  font-family: 'Roboto', sans-serif;
  position: relative;
  overflow: hidden;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  animation: fadeIn 1s ease-in-out;
}

.letter {
  font-size: 48px;
  font-weight: bold;
  color: #00e1ff; /* Color de hover del menú */
}

.footer {
  position: absolute;
  bottom: 20px;
  font-size: 12px;
  text-align: center;
  color: #e2e8f0; /* Color del texto del menú */
  padding: 0 10px;
  line-height: 1.5;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

/* Media Queries for Responsiveness */
@media (max-width: 768px) {
  .spinner {
    font-size: 32px;
  }

  .letter {
    font-size: 32px;
  }

  .footer {
    font-size: 10px;
  }
}
</style>


