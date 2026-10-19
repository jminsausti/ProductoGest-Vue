<script setup>
defineProps({
  producto: { type: Object, required: true }
})
</script>

<template>
  <li :title="`Categoría: ${producto.categoria}`">
    <strong>{{ producto.nombre }}</strong> —
    {{ producto.precio }} € ({{ producto.categoria }})
  </li>
</template>

<style scoped>
li { padding: .5rem 0; }
</style>
