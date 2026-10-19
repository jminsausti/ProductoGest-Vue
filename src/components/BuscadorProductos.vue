<script setup>
// El componente recibe del padre el texto actual de búsqueda.
// Las props son de solo lectura: el hijo no debe modificarlas directamente.
defineProps({
  busqueda: { type: String, required: true }
})

// Declaramos los dos eventos que este componente puede emitir hacia App.vue.
const emit = defineEmits(['actualizar-busqueda', 'limpiar-busqueda'])

// Cada pulsación en el input comunica al padre el texto introducido.
function actualizar(evento) {
  emit('actualizar-busqueda', evento.target.value)
}
</script>

<template>
  <div class="buscador">
    <label for="buscar">Buscar producto:</label>
    <input
      id="buscar"
      type="search"
      :value="busqueda"
      placeholder="Ej.: Ratón"
      @input="actualizar"
    />
    <!-- El botón notifica al padre que debe vaciar el texto de búsqueda. -->
    <button type="button" :disabled="!busqueda" @click="emit('limpiar-busqueda')">
      Limpiar búsqueda
    </button>
  </div>
</template>

<style scoped>
/* Los estilos scoped se aplican a la vista de este componente. */
.buscador { display: flex; flex-wrap: wrap; align-items: center; gap: .6rem; margin-top: 1.5rem; }
input { padding: .5rem; }
button { padding: .5rem .8rem; cursor: pointer; }
button:disabled { cursor: not-allowed; }
</style>
