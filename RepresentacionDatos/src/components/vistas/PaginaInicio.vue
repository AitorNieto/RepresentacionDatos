<template>
  <div class="pagina-inicio">
    <h1>Bienvenido al <span class="resaltado">Visualizador Financiero</span></h1>
    <p class="descripcion">
      Esta aplicación te permite analizar datos financieros de manera interactiva.
      Puedes visualizar gráficos, estadísticas y realizar análisis detallados de los datos disponibles.
    </p>
    <p class="descripcion">
      Usa el menú de la izquierda para navegar entre las diferentes secciones:
    </p>
    <ul class="lista-secciones">
      <li><strong>🏠 Inicio:</strong> Esta página de introducción.</li>
      <li><strong>📊 Visualizador de datos:</strong> Explora gráficos y tablas con información financiera.</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PaginaInicio',
};
</script>

<style scoped>
.pagina-inicio {
  padding: 60px 40px;
  background: linear-gradient(135deg, #0a0e17, #020617);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  color: white;
  animation: fadeIn 1s ease-in-out;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.pagina-inicio::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #06b6d4, #3b82f6);
  background-size: 200% 200%;
  animation: gradientFlow 3s ease infinite;
}

@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
  color: #ffffff;
  position: relative;
  z-index: 1;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.5px;
}

h1 .resaltado {
  background: linear-gradient(90deg, #3b82f6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
}

h1 .resaltado::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #06b6d4);
  border-radius: 2px;
}

.descripcion {
  font-size: 1.25rem;
  line-height: 1.7;
  margin-bottom: 30px;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  color: rgba(255, 255, 255, 0.9);
  position: relative;
  z-index: 1;
}

/* Contenedor para imágenes o gráficos */
.imagen-destacada {
  margin: 40px auto;
  width: 100%;
  max-width: 900px;
  height: 300px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px dashed rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.imagen-destacada:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(59, 130, 246, 0.3);
}

.imagen-destacada::before {
  content: 'Área para gráficos o imágenes destacadas';
  color: rgba(255, 255, 255, 0.3);
  font-size: 1.1rem;
}

.lista-secciones {
  margin-top: 40px;
  padding-left: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  position: relative;
  z-index: 1;
}

.lista-secciones li {
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 12px;
  text-align: left;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  position: relative;
  overflow: hidden;
}

.lista-secciones li::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, #3b82f6, #06b6d4);
}

.lista-secciones li:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-color: rgba(59, 130, 246, 0.3);
}

.lista-secciones li strong {
  display: block;
  margin-bottom: 8px;
  font-size: 1.2rem;
  color: #3b82f6;
}

/* Efectos de partículas tecnológicas */
.techo-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.techo-effect::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
  animation: rotate 60s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .pagina-inicio {
    padding: 20px;
  }

  h1 {
    font-size: 2rem;
  }

  .lista-secciones {
    grid-template-columns: 1fr;
  }
}
</style>