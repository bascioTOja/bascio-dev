import { createRouter, createWebHistory } from 'vue-router';

import Tools from '@/views/Tools.vue';
import Home from '@/views/Home.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/Login.vue'),
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/auth/ForgotPassword.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/Register.vue'),
  },
  {
    path: '/me',
    name: 'profile',
    component: () => import('@/views/auth/Profile.vue'),
  },
  {
    path: '/snake',
    name: 'tools.snake',
    component: () => import('@/views/snake/Snake.vue'),
  },
  {
    path: '/snake3d',
    name: 'tools.snake_3d',
    component: () => import('@/views/snake3D/Snake3D.vue'),
  },
  {
    path: '/tools',
    alias: '/t',
    name: 'tools',
    component: Tools,
    children: [
      {
        path: 'short-url',
        name: 'tools.url-shortener',
        component: () => import('@/views/tools/UrlShortener.vue'),
      },
      {
        path: 'compound-interest-calculator',
        name: 'tools.compound-interest-calculator',
        component: () => import('@/views/tools/CompoundInterestCalculator.vue'),
      },
      {
        path: 'hours-calculator',
        name: 'tools.hours-calculator',
        component: () => import('@/views/tools/HoursCalculator.vue'),
      },
      {
        path: 'write-code-faster',
        name: 'tools.write-code-faster',
        component: () => import('@/views/tools/WriteCodeFaster.vue'),
      },
      {
        path: 'chat-gpt',
        name: 'tools.chat-gpt',
        component: () => import('@/views/tools/ChatGpt.vue'),
      },
      {
        path: 'own-chatbot',
        name: 'tools.own-chatbot',
        component: () => import('@/views/tools/OwnChatbot.vue'),
      },
      {
        path: 'pdf-tools',
        name: 'tools.pdf-tools',
        component: () => import('@/views/tools/PdfTools.vue'),
      },
      {
        path: 'pulls',
        name: 'tools.pulls',
        component: () => import('@/views/tools/Pulls.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
