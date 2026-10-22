<script setup>
import { useCarritoStore } from './stores/carrito'

const carrito = useCarritoStore()
// App.vue deja de gestionar el catálogo: ahora solo define la estructura común.
// RouterView muestra la vista que corresponde a la URL actual.
</script>

<template>
  <div class="aplicacion">
    <header>
      <h1>ProductoGest</h1>
      <nav aria-label="Navegación principal">
        <RouterLink :to="{ name: 'catalogo' }">Catálogo</RouterLink>
        <RouterLink :to="{ name: 'carrito' }">
            Carrito ({{ carrito.numeroUnidades }})
        </RouterLink>
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
.aplicacion { max-width: 720px; margin: 2rem auto; padding: 0 1rem; font-family: system-ui, sans-serif; }
nav { margin-bottom: 1.5rem; }
</style>
