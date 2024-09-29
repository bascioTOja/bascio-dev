import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import { createPinia } from 'pinia';
import router from '@/router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas);
library.add(fab);
library.add(far);

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const accessToken = JSON.parse(localStorage.getItem('token'))?.access || null;
if (accessToken) {
  axios.defaults.headers.common['Authorization'] = 'JWT ' + accessToken;
}

const pinia = createPinia();
const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(pinia);
app.use(router);

app.mount('#app');
