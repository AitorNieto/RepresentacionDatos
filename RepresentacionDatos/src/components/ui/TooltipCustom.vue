<template>
  <div class="tooltip-container">
    <div 
      @mouseenter="mostrarTooltip = true"
      @mouseleave="mostrarTooltip = false"
      @focusin="mostrarTooltip = true"
      @focusout="mostrarTooltip = false"
      class="elemento-con-tooltip"
    >
      <slot name="trigger"></slot>
    </div>
    
    <div 
      v-if="mostrarTooltip" 
      class="tooltip"
      :class="[posicion, { 'tooltip-visible': mostrarTooltip }]"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TooltipCustom',
  props: {
    posicion: {
      type: String,
      default: 'top', // top, bottom, left, right
      validator: value => ['top', 'bottom', 'left', 'right'].includes(value)
    },
    mostrarPorDefecto: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mostrarTooltip: this.mostrarPorDefecto
    }
  }
}
</script>

<style scoped>
.tooltip-container {
  position: relative;
  display: inline-block;
}

.elemento-con-tooltip {
  display: inline-block;
}

.tooltip {
  position: absolute;
  z-index: 100;
  padding: 6px 10px;
  background-color: #1e293b;
  color: white;
  border-radius: 4px;
  font-size: 0.875rem;
  line-height: 1.4;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.tooltip-visible {
  opacity: 1;
}

.tooltip.top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
}

.tooltip.bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8px;
}

.tooltip.left {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 8px;
}

.tooltip.right {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 8px;
}

.tooltip::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
}

.tooltip.top::after {
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px 5px 0;
  border-color: #1e293b transparent transparent;
}

.tooltip.bottom::after {
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 0 5px 5px;
  border-color: transparent transparent #1e293b;
}

.tooltip.left::after {
  left: 100%;
  top: 50%;
  margin-top: -5px;
  border-width: 5px 0 5px 5px;
  border-color: transparent transparent transparent #1e293b;
}

.tooltip.right::after {
  right: 100%;
  top: 50%;
  margin-top: -5px;
  border-width: 5px 5px 5px 0;
  border-color: transparent #1e293b transparent transparent;
}
</style>