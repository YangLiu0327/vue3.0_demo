import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index';
import axiosInstance from './http';

const app = createApp(App);
app.config.globalProperties.$axios = axiosInstance;
app.use(router);
app.use(ElementPlus)
app.mount('#app');
