import { createRouter, createWebHistory } from 'vue-router'

import Tools from "@/views/Tools.vue";
import Home from "@/views/Home.vue";

const routes = [
  {path: '/', name: 'Home', component: Home},
  {path: '/tools', name: 'Tools', component: Tools, alias: '/t'},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
