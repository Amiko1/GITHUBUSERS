import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toaster from '@meforma/vue-toaster';



import './styles/app.css'; // Here
const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
app.use(Toaster);


