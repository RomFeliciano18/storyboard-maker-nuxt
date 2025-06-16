// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxtjs/i18n'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  i18n: {
    strategy: 'prefix', 
    defaultLocale: 'us',
    detectBrowserLanguage: false, 
    locales: [
      {
        code: 'us',
        iso: 'en-US',
        name: 'United States',
        file: 'us.json',
      },
      {
        code: 'en',
        iso: 'en-GB',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'fr',
        iso: 'fr-FR',
        name: 'Français',
        file: 'fr.json',
      },
    ],
    lazy: true, 
  },
});
