<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'

// Vue Router convierte :id de la URL en una prop gracias a props: true.
const props = defineProps({ id: { type: String, required: true } })
const producto = ref(null)
const cargando = ref(false)
const error = ref('')

async function cargarProducto(id) {
  cargando.value = true
  error.value = ''
  producto.value = null

  try {
    // Solicitamos SOLO el producto indicado por la URL, no todo el catálogo.
    const respuesta = await axios.get(`http://localhost:3000/productos/${encodeURIComponent(id)}`)
    producto.value = respuesta.data
  } catch (err) {
    if (err.response?.status === 404) {
      error.value = 'Ese producto no existe.'
    } else {
      error.value = 'No se pudo cargar el producto. Comprueba que JSON Server está activo.'
    }
    console.error('Error al cargar el producto:', err)
  } finally {
    cargando.value = false
  }
}

// immediate: true lanza la primera consulta al abrir la vista.
// Si cambia /productos/1 por /productos/2 sin desmontar la vista,
// watch vuelve a cargar los datos correspondientes al nuevo id.
watch(() => props.id, cargarProducto, { immediate: true })
</script>

<template>
  <main>
    <h2>Detalle del producto</h2>
    <p v-if="cargando" role="status">Cargando producto…</p>
    <div v-else-if="error" role="alert">
      <p>{{ error }}</p>
      <button type="button" @click="cargarProducto(props.id)">Reintentar</button>
    </div>
    <article v-else-if="producto">
      <h3>{{ producto.nombre }}</h3>
      <p>Categoría: {{ producto.categoria }}</p>
      <p>Precio: {{ producto.precio }} €</p>
    </article>
    <RouterLink :to="{ name: 'catalogo' }">← Volver al catálogo</RouterLink>
  </main>
</template>
