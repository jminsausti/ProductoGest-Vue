import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Ambos complementos se registran antes de montar la aplicación.
app.use(createPinia())
app.use(router)
app.mount('#app')