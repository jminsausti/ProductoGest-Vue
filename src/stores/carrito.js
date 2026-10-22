import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCarritoStore = defineStore('carrito', () => {
  // STATE: los artículos añadidos, con sus cantidades.
  const articulos = ref([])

  // GETTERS: valores derivados del estado; se actualizan automáticamente.
  const numeroUnidades = computed(() =>
    articulos.value.reduce((total, articulo) => total + articulo.cantidad, 0)
  )

  const importeTotal = computed(() =>
    articulos.value.reduce(
      (total, articulo) => total + articulo.precio * articulo.cantidad,
      0
    )
  )

  // ACTION: añade una unidad del producto al carrito.
  function agregarProducto(producto) {
    const existente = articulos.value.find(articulo => articulo.id === producto.id)

    if (existente) {
      existente.cantidad++
    } else {
      articulos.value.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1
      })
    }
  }

  // ACTION: elimina por completo un artículo del carrito.
  function quitarProducto(id) {
    articulos.value = articulos.value.filter(articulo => articulo.id !== id)
  }

  // ACTION: deja el carrito vacío.
  function vaciarCarrito() {
    articulos.value = []
  }

  return {
    articulos,
    numeroUnidades,
    importeTotal,
    agregarProducto,
    quitarProducto,
    vaciarCarrito
  }
})