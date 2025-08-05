<template>
  <transition name="modal">
    <div v-if="mostrar" class="modal-overlay" @click.self="cerrar">
      <div class="modal-contenedor" :style="{ maxWidth: ancho }">
        <div class="modal-cabecera">
          <h3 class="modal-titulo">{{ titulo }}</h3>
          <button @click="cerrar" class="modal-cerrar">
            &times;
          </button>
        </div>
        <div class="modal-contenido">
          <slot></slot>
        </div>
        <div v-if="mostrarFooter" class="modal-footer">
          <slot name="footer">
            <button @click="cerrar" class="boton-secundario">
              Cerrar
            </button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ModalDetalles',
  props: {
    mostrar: {
      type: Boolean,
      default: false
    },
    titulo: {
      type: String,
      default: 'Detalles'
    },
    ancho: {
      type: String,
      default: '600px'
    },
    mostrarFooter: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    cerrar() {
      this.$emit('cerrar')
    }
  },
  watch: {
    mostrar(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal-contenedor {
  background-color: white;
  border-radius: 8px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modal-cabecera {
  padding: 16px 20px;
  border-bottom: 1px solid #e7e5e4;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-titulo {
  margin: 0;
  font-size: 1.25rem;
  color: #292524;
}

.modal-cerrar {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #64748b;
  padding: 0 6px;
}

.modal-cerrar:hover {
  color: #dc2626;
}

.modal-contenido {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

.modal-footer {
  padding: 16px 20px;
  border-top: 1px solid #e7e5e4;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.boton-secundario {
  padding: 8px 16px;
  background-color: white;
  border: 1px solid #d6d3d1;
  border-radius: 4px;
  color: #292524;
  cursor: pointer;
}

.boton-secundario:hover {
  background-color: #f5f5f4;
}
</style>