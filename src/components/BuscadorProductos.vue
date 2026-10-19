<script setup>
// El padre es propietario de la búsqueda: el hijo recibe su valor.
defineProps({
  busqueda: { type: String, required: true }
})

// El hijo notifica las acciones del usuario sin modificar la prop.
const emit = defineEmits(['actualizar-busqueda', 'limpiar-busqueda'])

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
    <button type="button" :disabled="!busqueda" @click="emit('limpiar-busqueda')">
      Limpiar búsqueda
    </button>
  </div>
</template>

<style scoped>
.buscador { display: flex; flex-wrap: wrap; align-items: center; gap: .6rem; margin-top: 1.5rem; }
input { padding: .5rem; }
button { padding: .5rem .8rem; cursor: pointer; }
button:disabled { cursor: not-allowed; }
</style>
