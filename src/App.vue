<script setup>
// App.vue coordina los componentes y conserva el estado compartido.
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import ProductoCard from './components/ProductoCard.vue'
import BuscadorProductos from './components/BuscadorProductos.vue'

const titulo = 'ProductoGest'
const API_URL = 'http://localhost:3000/productos'

// El catálogo comienza vacío: ahora lo obtendremos por HTTP.
const productos = ref([])
const busqueda = ref('')

// Estados de la petición para informar al usuario de qué sucede.
const cargando = ref(false)
const error = ref('')

// El filtrado sigue siendo reactivo y no necesita cambios al usar Axios.
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
    // Axios hace un GET y transforma automáticamente el JSON de la respuesta.
    const respuesta = await axios.get(API_URL)
    productos.value = respuesta.data
  } catch (err) {
    // Si falla la API, mostramos un mensaje en vez de dejar una lista engañosa.
    productos.value = []
    error.value = 'No se pudieron cargar los productos. Comprueba que JSON Server está activo.'
    console.error('Error al consultar la API:', err)
  } finally {
    // finally se ejecuta tanto si la petición funciona como si falla.
    cargando.value = false
  }
}

// Cuando Vue monta el componente, realizamos la primera petición.
onMounted(cargarProductos)

// El padre recibe los eventos personalizados del buscador.
function actualizarBusqueda(texto) {
  busqueda.value = texto
}

function limpiarBusqueda() {
  busqueda.value = ''
}
</script>

<template>
  <main>
    <h1>{{ titulo }}</h1>
    <p>Catálogo de productos informáticos</p>

    <!-- La búsqueda sigue delegada en su propio componente. -->
    <BuscadorProductos
      :busqueda="busqueda"
      @actualizar-busqueda="actualizarBusqueda"
      @limpiar-busqueda="limpiarBusqueda"
    />

    <!-- Un solo estado visible cada vez: carga, error o resultado. -->
    <p v-if="cargando" role="status">Cargando productos…</p>

    <div v-else-if="error" role="alert">
      <p>{{ error }}</p>
      <button type="button" @click="cargarProductos">Reintentar</button>
    </div>

    <template v-else>
      <p>Productos en el catálogo: {{ productos.length }}</p>
      <p>Productos encontrados: {{ productosFiltrados.length }}</p>

      <p v-if="productosFiltrados.length === 0" role="status">
        No hay productos que coincidan con la búsqueda.
      </p>
      <ul v-else>
        <!-- Cada elemento conserva su identificador estable como clave. -->
        <ProductoCard
          v-for="producto in productosFiltrados"
          :key="producto.id"
          :producto="producto"
        />
      </ul>
    </template>
  </main>
</template>

<style scoped>
/* Mantenemos la interfaz sencilla para centrarnos en HTTP y reactividad. */
main {
  max-width: 720px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: system-ui, sans-serif;
}
</style>
