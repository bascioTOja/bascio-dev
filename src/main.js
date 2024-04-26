import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import axios from "axios";
import {createPinia} from "pinia";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

const access = JSON.parse(localStorage.getItem('token'))?.access || null;
if (access) {
    axios.defaults.headers.common['Authorization'] = 'JWT ' + access;
}

createApp(App)
    .use(createPinia())
    .use(router)
    .mount('#app')
