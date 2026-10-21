<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import ProductoCard from '../components/ProductoCard.vue'
import BuscadorProductos from '../components/BuscadorProductos.vue'

const API_URL = 'http://localhost:3000/productos'

// Este estado pertenecía antes a App.vue; ahora pertenece a la vista del catálogo.
const productos = ref([])
const busqueda = ref('')
const cargando = ref(false)
const error = ref('')

const productosFiltrados = computed(() => {
  const texto = busqueda.value.trim().toLocaleLowerCase('es')
  return productos.value.filter(producto =>
    producto.nombre.toLocaleLowerCase('es').includes(texto)
  )
})

async function cargarProductos() {
  cargando.value = true
  error.value = ''

  try {
    const respuesta = await axios.get(API_URL)
    productos.value = respuesta.data
  } catch (err) {
    productos.value = []
    error.value = 'No se pudieron cargar los productos. Comprueba que JSON Server está activo.'
    console.error('Error al consultar la API:', err)
  } finally {
    cargando.value = false
  }
}

// Al entrar en la vista por primera vez, consultamos la API.
onMounted(cargarProductos)

function actualizarBusqueda(texto) { busqueda.value = texto }
function limpiarBusqueda() { busqueda.value = '' }
</script>

<template>
  <main>
    <h2>Catálogo de productos informáticos</h2>

    <BuscadorProductos
      :busqueda="busqueda"
      @actualizar-busqueda="actualizarBusqueda"
      @limpiar-busqueda="limpiarBusqueda"
    />

    <p v-if="cargando" role="status">Cargando productos…</p>
    <div v-else-if="error" role="alert">
      <p>{{ error }}</p>
      <button type="button" @click="cargarProductos">Reintentar</button>
    </div>
    <template v-else>
      <p>Productos en el catálogo: {{ productos.length }}</p>
      <p>Productos encontrados: {{ productosFiltrados.length }}</p>
      <p v-if="productosFiltrados.length === 0">No hay productos que coincidan con la búsqueda.</p>
      <ul v-else>
        <ProductoCard
          v-for="producto in productosFiltrados"
          :key="producto.id"
          :producto="producto"
        />
      </ul>
    </template>
  </main>
</template>
