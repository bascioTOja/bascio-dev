import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import { createPinia } from 'pinia';
import router from '@/router';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const accessToken = JSON.parse(localStorage.getItem('token'))?.access || null;
if (accessToken) {
  axios.defaults.headers.common['Authorization'] = 'JWT ' + accessToken;
}

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');
