# 📊 Visualizador Financiero

## 🚀 Descripción

**Visualizador Financiero** es una aplicación web moderna y profesional desarrollada con Vue.js 3 para el análisis y visualización de datos financieros. La aplicación permite a los usuarios analizar patrones de mercado, visualizar distribuciones alcistas/bajistas y obtener estadísticas detalladas de datos OHLC (Open, High, Low, Close).

### 🎯 Características Principales

- **📈 Visualizaciones Interactivas**: Gráficos circulares y de barras con ECharts
- **📊 Análisis de Datos**: Estadísticas OHLC con métricas avanzadas
- **🔄 Filtros Temporales**: Análisis por períodos diarios, semanales y mensuales
- **🎨 Diseño Moderno**: Interfaz intuitiva con gradientes y animaciones
- **📱 Responsive**: Adaptable a diferentes dispositivos y tamaños de pantalla
- **⚡ Rendimiento**: Carga rápida con Vite y componentes optimizados

## 🛠️ Stack Tecnológico

### Frontend
- **Vue.js 3** - Framework principal con Composition API
- **Vue Router 4** - Navegación SPA
- **ECharts** - Librería de visualización de datos
- **Vite** - Build tool y bundler
- **CSS3** - Estilos modernos con gradientes y animaciones

### Arquitectura
- **Composables** - Sistema de gestión de estado reactivo
- **Componentes Modulares** - Arquitectura escalable y reutilizable
- **Singleton Pattern** - Gestión centralizada de datos
- **Responsive Design** - Adaptación a múltiples dispositivos

## 📦 Instalación

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/visualizador-financiero.git

# 2. Navegar al directorio
cd RepresentacionDatos

# 3. Instalar dependencias
npm install

# 4. Ejecutar en modo desarrollo
npm run dev

# 5. Abrir en el navegador
# La aplicación estará disponible en http://localhost:5173
```

## 🏗️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye la aplicación para producción
npm run preview      # Previsualiza la build de producción

# Linting
npm run lint         # Ejecuta ESLint para verificar código
npm run lint:fix     # Corrige automáticamente errores de linting
```

## 📁 Estructura del Proyecto

```
RepresentacionDatos/
├── public/                     # Archivos públicos estáticos
├── src/
│   ├── assets/                # Recursos estáticos (CSS, imágenes)
│   ├── components/            # Componentes Vue
│   │   ├── datos/            # Archivos JSON con datos financieros
│   │   ├── diseno/           # Componentes de diseño y layout
│   │   ├── filtros/          # Componentes de filtrado
│   │   ├── graficos/         # Componentes de visualización
│   │   └── vistas/           # Componentes de páginas/vistas
│   ├── composables/          # Lógica reutilizable (estado, datos)
│   ├── router/               # Configuración de rutas
│   ├── App.vue              # Componente raíz
│   └── main.js              # Punto de entrada
├── package.json             # Dependencias y scripts
└── README.md               # Documentación
```

## 🎯 Funcionalidades Detalladas

### 🏠 Dashboard Principal
- **Pantalla de Bienvenida**: Animación de carga personalizada
- **Navegación Intuitiva**: Menú lateral con iconos descriptivos
- **Página de Inicio**: Introducción y guía de uso

### 📊 Visualizaciones

#### Gráfico Circular - Distribución Alcista/Bajista
- Visualización de la distribución de tendencias del mercado
- Colores diferenciados para tendencias alcistas (verde) y bajistas (rojo)
- Tooltips interactivos con porcentajes detallados

#### Gráfico de Barras - Tops & Bottoms
- Análisis de picos y valles en los datos financieros
- Visualización comparativa con barras bidireccionales
- Filtrado por temporalidad (diario, semanal, mensual)

#### Tabla Estadística OHLC
- Métricas estadísticas completas: Media, Desviación Estándar, Percentiles
- Datos organizados por categorías: Extensiones, Fades
- Diseño tabular responsive con hover effects

### 🔧 Sistema de Filtros
- **Filtro Temporal**: Cambio dinámico entre períodos
- **Actualización Automática**: Los gráficos se actualizan en tiempo real
- **Persistencia**: Los filtros mantienen su estado durante la navegación

## 📊 Datos y Formato

La aplicación procesa datos financieros en formato JSON con la siguiente estructura:

```json
{
  "OHLC": {
    "direction": {
      "Bullish": 65.4,
      "Bearish": 34.6
    },
    "Diario": {
      "higher_extension": {
        "Mean": 2.34,
        "Std": 1.45,
        "P25": 1.20,
        "P50": 2.10,
        "P75": 3.15,
        "Max": 8.90
      }
    }
  },
  "pivot_points": {
    "diario": {
      "top": { "2024-01": 45.2, "2024-02": 52.1 },
      "bottom": { "2024-01": -23.4, "2024-02": -18.7 }
    }
  }
}
```

## 🎨 Personalización de Diseño

### Colores Principales
- **Azul Principal**: `#3b82f6` - Elementos interactivos
- **Rosa de Fondo**: `#ffc0cb` - Fondo general de la aplicación
- **Verde Alcista**: `#10b981` - Indicadores positivos
- **Rojo Bajista**: `#ef4444` - Indicadores negativos

### Tipografía
- **Fuente Principal**: Roboto (Google Fonts)
- **Tamaños**: Sistema escalable para diferentes dispositivos

## 🚀 Despliegue

### Build para Producción
```bash
npm run build
```

### Despliegue en Netlify
1. Conectar repositorio de GitHub
2. Configurar build command: `npm run build`
3. Configurar publish directory: `dist`

### Despliegue en Vercel
1. Importar proyecto desde GitHub
2. Configuración automática detectada
3. Deploy automático en cada push

## 🧪 Testing y Calidad

### Herramientas de Desarrollo
- **ESLint**: Linting y estándares de código
- **Prettier**: Formateo automático de código
- **Vue DevTools**: Debugging y desarrollo

### Mejores Prácticas Implementadas
- Separación de responsabilidades
- Componentes reutilizables
- Gestión centralizada del estado
- Manejo de errores
- Código documentado

## 📈 Roadmap y Mejoras Futuras

### Versión 2.0
- [ ] Autenticación de usuarios
- [ ] Dashboard personalizable
- [ ] Exportación de datos (PDF, Excel)
- [ ] Múltiples fuentes de datos
- [ ] Alertas y notificaciones

### Versión 2.1
- [ ] Análisis predictivo con IA
- [ ] Integración con APIs externas
- [ ] Modo oscuro
- [ ] Comparación de períodos
- [ ] Reportes automatizados

## 🤝 Contribución
Aitor Nieto - Guillermo Beltrán
### Cómo Contribuir
1. Fork del repositorio
2. Crear rama para nueva feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### Estándares de Código
- Seguir guías de estilo de Vue.js
- Documentar funciones complejas
- Escribir commits descriptivos
- Mantener componentes pequeños y enfocados

## 📞 Soporte y Contacto

### Equipo de Desarrollo
- **Design**: Aitor Nieto & Guillermo Beltrán
- **Development**: Aitor Nieto, Guillermo Beltrán

### Contacto
- **Email**: soporte@visualizadorfinanciero.com
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/visualizador-financiero/issues)
- **Documentación**: [Wiki del Proyecto](https://github.com/tu-usuario/visualizador-financiero/wiki)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 🏆 Reconocimientos

- **ECharts** - Por la excelente librería de visualización
- **Vue.js Community** - Por el framework y recursos
- **Google Fonts** - Por las tipografías utilizadas

---

**Visualizador Financiero** - Transformando datos en insights financieros 📊✨

*© 2025 Visualizador De Datos. Todos los derechos reservados.*