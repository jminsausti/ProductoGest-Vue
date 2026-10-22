<script setup>
import { storeToRefs } from 'pinia'
import { useCarritoStore } from '../stores/carrito'

const carrito = useCarritoStore()

// Extraemos estado y getters sin perder su reactividad.
const { articulos, numeroUnidades, importeTotal } = storeToRefs(carrito)

// Las acciones se pueden utilizar directamente desde el store.
const { quitarProducto, vaciarCarrito } = carrito
</script>

<template>
  <main>
    <h2>Carrito</h2>

    <p v-if="articulos.length === 0">Todavía no has añadido productos.</p>

    <template v-else>
      <ul>
        <li v-for="articulo in articulos" :key="articulo.id">
          {{ articulo.nombre }} — {{ articulo.precio }} €
          × {{ articulo.cantidad }}
          <button type="button" @click="quitarProducto(articulo.id)">
            Quitar
          </button>
        </li>
      </ul>

      <p>Unidades: {{ numeroUnidades }}</p>
      <p>Total: {{ importeTotal.toFixed(2) }} €</p>
      <button type="button" @click="vaciarCarrito">Vaciar carrito</button>
    </template>

    <RouterLink :to="{ name: 'catalogo' }">Volver al catálogo</RouterLink>
  </main>
</template>