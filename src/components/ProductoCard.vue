<script setup>
// La ficha recibe datos del catálogo y genera una navegación al detalle.
defineProps({ producto: { type: Object, required: true } })
</script>

<template>
  <li :title="`Categoría: ${producto.categoria}`">
    <strong>{{ producto.nombre }}</strong> —
    {{ producto.precio }} € ({{ producto.categoria }})
    <!-- Ruta por nombre: Vue Router construye /productos/ID automáticamente. -->
    <RouterLink :to="{ name: 'detalle', params: { id: producto.id } }">Ver detalle</RouterLink>
  </li>
</template>

<style scoped>
li { padding: .5rem 0; }
a { margin-left: .5rem; }
</style>
