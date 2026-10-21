<script setup>
import { useRouter } from 'vue-router'

// Los datos del producto llegan desde CatalogoView a través de una prop.
const props = defineProps({ producto: { type: Object, required: true } })

// useRouter proporciona los métodos para navegar desde JavaScript.
const router = useRouter()

function verDetalle() {
  // Una ruta con nombre evita escribir la URL manualmente.
  // Vue Router sustituye :id por el identificador del producto.
  router.push({ name: 'detalle', params: { id: props.producto.id } })
}
</script>

<template>
  <li :title="`Categoría: ${producto.categoria}`">
    <strong>{{ producto.nombre }}</strong> —
    {{ producto.precio }} € ({{ producto.categoria }})
    <!-- En este ejemplo provocamos la navegación mediante un evento. -->
    <button type="button" @click="verDetalle">Ver detalle</button>
  </li>
</template>

<style scoped>
li { padding: .5rem 0; }
button { margin-left: .5rem; cursor: pointer; }
</style>
