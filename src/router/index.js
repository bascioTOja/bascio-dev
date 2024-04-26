import { createRouter, createWebHistory } from 'vue-router';

import Tools from "@/views/Tools.vue";
import Home from "@/views/Home.vue";

const routes = [
  {path: '/', name: 'home', component: Home},
  {path: '/login', name: 'login', component: () => import(/* webpackChunkName: "login" */ '@/views/auth/Login.vue')},
  {path: '/forgot-password', name: 'forgot-password', component: () => import(/* webpackChunkName: "forgot-password" */ '@/views/auth/ForgotPassword.vue')},
  {path: '/register', name: 'register', component: () => import(/* webpackChunkName: "register" */ '@/views/auth/Register.vue')},
  {
    path: '/tools',
    alias: '/t',
    name: 'tools',
    component: Tools,
    children: [
      {path: 'short-url', name: 'tools.url-shortener', component: () => import(/* webpackChunkName: "short-url" */ '@/views/tools/UrlShortener.vue')},
      {path: 'snake', name: 'tools.snake', component: () => import(/* webpackChunkName: "short-url" */ '@/views/tools/Snake.vue')},
      {path: 'snake3d', name: 'tools.snake-3d', component: () => import(/* webpackChunkName: "short-url" */ '@/views/tools/Snake3D.vue')},
      {path: 'hours-calculator', name: 'tools.hours-calculator', component: () => import(/* webpackChunkName: "hours-calculator" */ '@/views/tools/HoursCalculator.vue')},
      {path: 'write-code-faster', name: 'tools.write-code-faster', component: () => import(/* webpackChunkName: "write-code-faster" */ '@/views/tools/WriteCodeFaster.vue')},
      {path: 'chat-gpt', name: 'tools.chat-gpt', component: () => import(/* webpackChunkName: "chat-gpt" */ '@/views/tools/ChatGpt.vue')},
      {path: 'own-chatbot', name: 'tools.own-chatbot', component: () => import(/* webpackChunkName: "own-chatbot" */ '@/views/tools/OwnChatbot.vue')},
      {path: 'pdf-tools', name: 'tools.pdf-tools', component: () => import(/* webpackChunkName: "pdf-tools" */ '@/views/tools/PdfTools.vue')},
      {path: 'pulls', name: 'tools.pulls', component: () => import(/* webpackChunkName: "pulls" */ '@/views/tools/Pulls.vue')},
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
