// https://nuxt.com/docs/api/configuration/nuxt-config
import { process } from 'std-env';

interface SessionData {
  id: string | number
  firstName: string
  lastName: string
}

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', '@nuxt/ui', '@nuxt/image', '@pinia/nuxt', '@sidebase/nuxt-auth'],
  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:8000/api',
    },
  },

  auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    originEnvKey: 'NUXT_BASE_URL',
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/jwt/create', method: 'post' },
        signOut: false, // { path: '/jwt/logout', method: 'post' },
        signUp: { path: '/users', method: 'post' },
        getSession: { path: '/users/me', method: 'get' },
      },
      token: {
        signInResponseTokenPointer: '/access',
        type: 'Bearer',
        headerName: 'Authorization',
        cookieName: 'auth.jwttoken',
        maxAgeInSeconds: 86200, // 1 day - 200 seconds
        sameSiteAttribute: 'lax',
        secureCookieAttribute: false,
        httpOnlyCookieAttribute: false,
      },
      refresh: {
        isEnabled: true,
        endpoint: { path: '/jwt/refresh', method: 'post' },
        refreshOnlyToken: true,
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
          firstName: 'string',
          lastName: 'string',
        },
      },
      pages: {
        login: '/login'
      },
    },
    sessionRefresh: {
      enablePeriodically: true,
      enableOnWindowFocus: true,
    }
  },
  ui: {
    theme: {
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'green', 'blue', 'yellow', 'brown', 'sand', 'neutral'],
    },
  },
})
