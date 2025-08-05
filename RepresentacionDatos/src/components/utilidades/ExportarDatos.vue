<template>
  <div class="exportar-datos">
    <button @click="mostrarOpciones = !mostrarOpciones" class="boton-exportar">
      Exportar
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
    </button>

    <div v-if="mostrarOpciones" class="opciones-exportar">
      <button @click="exportar('png')" class="opcion-exportar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        PNG
      </button>
      <button @click="exportar('jpg')" class="opcion-exportar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        JPG
      </button>
      <button @click="exportar('csv')" class="opcion-exportar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <path d="M16 13H8"></path>
          <path d="M16 17H8"></path>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        CSV
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExportarDatos',
  props: {
    datos: {
      type: [Object, Array],
      required: true
    },
    nombreArchivo: {
      type: String,
      default: 'datos'
    }
  },
  data() {
    return {
      mostrarOpciones: false
    }
  },
  methods: {
    exportar(formato) {
      this.mostrarOpciones = false
      this.$emit('exportar', { formato, datos: this.datos })
      
      // Ejemplo simple para CSV
      if (formato === 'csv') {
        let csvContent = ''
        
        if (Array.isArray(this.datos)) {
          // Cabeceras
          const headers = Object.keys(this.datos[0])
          csvContent += headers.join(',') + '\n'
          
          // Datos
          this.datos.forEach(item => {
            csvContent += headers.map(header => item[header]).join(',') + '\n'
          })
        } else {
          // Para objetos
          const headers = Object.keys(this.datos)
          csvContent += headers.join(',') + '\n'
          csvContent += headers.map(header => this.datos[header]).join(',') + '\n'
        }
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `${this.nombreArchivo}.csv`
        link.click()
      }
    }
  }
}
</script>

<style scoped>
.exportar-datos {
  position: relative;
  display: inline-block;
}

.boton-exportar {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.boton-exportar:hover {
  background-color: #2563eb;
}

.opciones-exportar {
  position: absolute;
  right: 0;
  top: 100%;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin-top: 4px;
  min-width: 120px;
}

.opcion-exportar {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  color: #292524;
}

.opcion-exportar:hover {
  background-color: #f5f5f4;
}
</style>