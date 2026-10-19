<script setup>
// App.vue actúa como componente padre: conserva los datos y coordina a sus hijos.
import { ref, computed } from 'vue'
import ProductoCard from './components/ProductoCard.vue'
import BuscadorProductos from './components/BuscadorProductos.vue'

const titulo = 'ProductoGest'

// ref() hace reactivo el catálogo: Vue actualizará la vista si cambia.
const productos = ref([
  { id: 1, nombre: 'Portátil', precio: 750, categoria: 'Ordenadores' },
  { id: 2, nombre: 'Ratón', precio: 25, categoria: 'Periféricos' },
  { id: 3, nombre: 'Teclado', precio: 45, categoria: 'Periféricos' },
  { id: 4, nombre: 'Monitor', precio: 180, categoria: 'Pantallas' }
])

// La búsqueda se mantiene en el padre: el buscador hijo solo la muestra y emite eventos.
const busqueda = ref('')

// computed() recalcula esta lista cuando cambian la búsqueda o los productos.
const productosFiltrados = computed(() => {
  const texto = busqueda.value.trim().toLocaleLowerCase('es')
  return productos.value.filter(producto =>
    producto.nombre.toLocaleLowerCase('es').includes(texto)
  )
})

// Respuesta al evento 'actualizar-busqueda' emitido por BuscadorProductos.
function actualizarBusqueda(texto) {
  busqueda.value = texto
}

// Respuesta al evento 'limpiar-busqueda' emitido por BuscadorProductos.
function limpiarBusqueda() {
  busqueda.value = ''
}
</script>

<template>
  <main>
    <h1>{{ titulo }}</h1>
    <p>Catálogo de productos informáticos</p>
    <p>Productos en el catálogo: {{ productos.length }}</p>

    <!-- El padre pasa 'busqueda' como prop (:) y escucha los eventos del hijo (@). -->
    <BuscadorProductos
      :busqueda="busqueda"
      @actualizar-busqueda="actualizarBusqueda"
      @limpiar-busqueda="limpiarBusqueda"
    />

    <p>Productos encontrados: {{ productosFiltrados.length }}</p>

    <!-- Si no hay resultados, mostramos el mensaje en lugar de la lista. -->
    <p v-if="productosFiltrados.length === 0" role="status">
      No hay productos que coincidan con la búsqueda.
    </p>
    <ul v-else>
      <!-- Cada producto se representa con un componente reutilizable. -->
      <ProductoCard
        v-for="producto in productosFiltrados"
        :key="producto.id"
        :producto="producto"
      />
    </ul>
  </main>
</template>

<style scoped>
/* Estilos del contenedor principal de la aplicación. */
main { max-width: 720px; margin: 2rem auto; padding: 0 1rem; font-family: system-ui, sans-serif; }
</style>
