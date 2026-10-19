<script setup>
import { ref, computed } from 'vue'
import ProductoCard from './components/ProductoCard.vue'
import BuscadorProductos from './components/BuscadorProductos.vue'

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
    <p>Productos en el catálogo: {{ productos.length }}</p>

    <BuscadorProductos
      :busqueda="busqueda"
      @actualizar-busqueda="actualizarBusqueda"
      @limpiar-busqueda="limpiarBusqueda"
    />

    <p>Productos encontrados: {{ productosFiltrados.length }}</p>
    <p v-if="productosFiltrados.length === 0" role="status">
      No hay productos que coincidan con la búsqueda.
    </p>
    <ul v-else>
      <ProductoCard
        v-for="producto in productosFiltrados"
        :key="producto.id"
        :producto="producto"
      />
    </ul>
  </main>
</template>

<style scoped>
main { max-width: 720px; margin: 2rem auto; padding: 0 1rem; font-family: system-ui, sans-serif; }
</style>
