<script setup>
import { ref } from 'vue'

const titulo = 'ProductoGest'
const productos = ref([
  { id: 1, nombre: 'Portátil', precio: 750, categoria: 'Ordenadores' },
  { id: 2, nombre: 'Ratón', precio: 25, categoria: 'Periféricos' },
  { id: 3, nombre: 'Teclado', precio: 45, categoria: 'Periféricos' },
  { id: 4, nombre: 'Monitor', precio: 180, categoria: 'Pantallas' }
])
</script>

<template>
  <main>
    <h1>{{ titulo }}</h1>
    <p>Catálogo de productos informáticos</p>
    <ul>
      <li v-for="producto in productos" :key="producto.id">
        <strong>{{ producto.nombre }}</strong> —
        {{ producto.precio }} € ({{ producto.categoria }})
      </li>
    </ul>
  </main>
</template>

<style scoped>
main { max-width: 720px; margin: 2rem auto; font-family: system-ui, sans-serif; }
li { padding: .5rem 0; }
</style>
