import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index';
import axiosInstance from './http';
import store from './store';
import '@fortawesome/fontawesome-free/css/all.css';


const app = createApp(App);
app.config.globalProperties.$axios = axiosInstance;
app.use(router);
app.use(store);
app.use(ElementPlus)
app.mount('#app');
