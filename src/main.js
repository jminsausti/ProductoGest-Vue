import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// El router debe instalarse antes de montar la aplicación.
createApp(App).use(router).mount('#app')