<script setup>
import { ref, computed } from 'vue'

const titulo = 'ProductoGest'
const productos = ref([
  { id: 1, nombre: 'Portátil', precio: 750, categoria: 'Ordenadores' },
  { id: 2, nombre: 'Ratón', precio: 25, categoria: 'Periféricos' },
  { id: 3, nombre: 'Teclado', precio: 45, categoria: 'Periféricos' },
  { id: 4, nombre: 'Monitor', precio: 180, categoria: 'Pantallas' }
])
const busqueda = ref('')

const productosFiltrados = computed(() => {
  const texto = busqueda.value.trim().toLocaleLowerCase('es')
  return productos.value.filter(producto =>
    producto.nombre.toLocaleLowerCase('es').includes(texto)
  )
})

function limpiarBusqueda() {
  busqueda.value = ''
}
</script>

<template>
  <main>
    <h1>{{ titulo }}</h1>
    <p>Catálogo de productos informáticos</p>
    <p>Productos en el catálogo: {{ productos.length }}</p>

    <div class="buscador">
      <label for="buscar">Buscar producto:</label>
      <input
        id="buscar"
        v-model="busqueda"
        type="search"
        placeholder="Ej.: Ratón"
      />
      <button type="button" @click="limpiarBusqueda" :disabled="!busqueda">
        Limpiar búsqueda
      </button>
    </div>

    <p>Productos encontrados: {{ productosFiltrados.length }}</p>
    <p v-if="productosFiltrados.length === 0" role="status">
      No hay productos que coincidan con la búsqueda.
    </p>
    <ul v-else>
      <li
        v-for="producto in productosFiltrados"
        :key="producto.id"
        :title="`Categoría: ${producto.categoria}`"
      >
        <strong>{{ producto.nombre }}</strong> —
        {{ producto.precio }} € ({{ producto.categoria }})
      </li>
    </ul>
  </main>
</template>

<style scoped>
main { max-width: 720px; margin: 2rem auto; padding: 0 1rem; font-family: system-ui, sans-serif; }
.buscador { display: flex; flex-wrap: wrap; align-items: center; gap: .6rem; margin-top: 1.5rem; }
input { padding: .5rem; }
button { padding: .5rem .8rem; cursor: pointer; }
button:disabled { cursor: not-allowed; }
li { padding: .5rem 0; }
</style>
