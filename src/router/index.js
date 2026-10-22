import { createRouter, createWebHistory } from 'vue-router'
import CatalogoView from '../views/CatalogoView.vue'
import DetalleView from '../views/DetalleView.vue'
import CarritoView from '../views/CarritoView.vue'

// :id es un segmento variable de la URL, como /productos/2.
const routes = [
  { path: '/', name: 'catalogo', component: CatalogoView },
  { path: '/productos/:id', name: 'detalle', component: DetalleView, props: true },
  { path: '/carrito', name: 'carrito', component: CarritoView },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})