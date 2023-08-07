// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  css: ['vuetify/lib/styles/main.css', '@mdi/font/css/materialdesignicons.min.css'],
  build: {
    transpile: ['vuetify']
  },
  modules: [
    '@pinia/nuxt',
  ],
  imports: {
    dirs: ['./stores'],
  },
  pinia: {
    autoImports: [
      'defineStore',
      'acceptHMRUpdate',
      ['defineStore', 'definePiniaStore'],
    ],
  },
})
