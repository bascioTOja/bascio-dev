// https://nuxt.com/docs/api/configuration/nuxt-config
import { process } from 'std-env';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  debug: process.env.DEBUG === "true",
  ssr: true,

  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', '@nuxt/ui', '@nuxt/image', '@pinia/nuxt', '@sidebase/nuxt-auth', '@nuxt/scripts', '@tresjs/nuxt'],
  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'localhost:3000',
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api',
    },
  },

  auth: {
    isEnabled: true,
    globalAppMiddleware: true,
    disableServerSideAuth: false,
    originEnvKey: 'NUXT_BASE_URL',
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/jwt/create/', method: 'post' },
        signOut: false, // { path: '/jwt/logou/', method: 'post' },
        signUp: { path: '/users/', method: 'post' },
        getSession: { path: '/users/me/', method: 'get' },
      },
      token: {
        signInResponseTokenPointer: '/access',
        type: 'JWT',
        headerName: 'Authorization',
        cookieName: 'auth.jwttoken',
        maxAgeInSeconds: 86200, // 1 day - 200 seconds
        sameSiteAttribute: 'lax',
        secureCookieAttribute: false,
        httpOnlyCookieAttribute: false,
      },
      refresh: {
        isEnabled: true,
        endpoint: { path: '/jwt/refresh/', method: 'post' },
        refreshOnlyToken: false,
        token: {
          signInResponseRefreshTokenPointer: '/refresh',
          refreshResponseTokenPointer: '/access',
          refreshRequestTokenPointer: '/refresh',
          cookieName: 'auth.refresh-jwttoken',
          maxAgeInSeconds: 1209400, // 14 days - 200 seconds
          sameSiteAttribute: 'lax',
          secureCookieAttribute: false,
          httpOnlyCookieAttribute: false,
        }
      },
      session: {
        dataType: {
          id: 'string | number',
          email: 'string',
          username: 'string',
          firstName: 'string',
          lastName: 'string',
        },
      },
      pages: {
        login: '/auth/login'
      },
    },
    sessionRefresh: {
      enablePeriodically: false,
      enableOnWindowFocus: true,
    }
  },
  ui: {
    theme: {
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'green', 'blue', 'yellow', 'brown', 'sand', 'neutral', 'red', 'gray'],
    },
  },
})