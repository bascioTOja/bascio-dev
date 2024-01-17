import { createRouter, createWebHistory } from 'vue-router'

import Tools from "@/views/Tools.vue";
import Home from "@/views/Home.vue";

const routes = [
  {path: '/', name: 'Home', component: Home},
  {path: '/tools', alias: '/t', name: 'Tools', component: Tools},
  {path: '/tools/short-url', alias: '/t/su', name: 'ShortUrl', component: () => import(/* webpackChunkName: "short-url" */ '@/views/ShortUrl.vue')},
  {path: '/tools/hours-calculator', alias: '/t/hc', name: 'HoursCalculator', component: () => import(/* webpackChunkName: "hours-calculator" */ '@/views/HoursCalculator.vue')},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
