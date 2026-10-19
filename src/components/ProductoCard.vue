<script setup>
// El componente padre nos pasa un producto completo mediante una prop.
// required: true indica que la prop es obligatoria.
defineProps({
  producto: { type: Object, required: true }
})
</script>

<template>
  <!-- :title enlaza dinámicamente el atributo HTML con la categoría. -->
  <li :title="`Categoría: ${producto.categoria}`">
    <!-- Vue muestra las propiedades del objeto recibido, sin copiarlas al estado local. -->
    <strong>{{ producto.nombre }}</strong> —
    {{ producto.precio }} € ({{ producto.categoria }})
  </li>
</template>

<style scoped>
/* Estilo exclusivo de la tarjeta de producto. */
li { padding: .5rem 0; }
</style>
