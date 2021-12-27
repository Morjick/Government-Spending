import { createApp } from 'vue'
import App from './App.vue'
import VuePapaParse from 'vue-papa-parse'

const app = createApp(App)

createApp(App).mount('#app')
app.use(VuePapaParse)