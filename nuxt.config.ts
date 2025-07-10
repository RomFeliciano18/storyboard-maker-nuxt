// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ssr: false,
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@nuxt/image', '@nuxtjs/i18n', '@vueuse/nuxt'],
  css: ['~/assets/css/main.css', 'remixicon/fonts/remixicon.css'],
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
        name: 'Canada-EN',
        file: 'en.json',
      },
      {
        code: 'fr',
        iso: 'fr-FR',
        name: 'Canada-FR',
        file: 'fr.json',
      },
    ],
    lazy: true,
    bundle: {
      optimizeTranslationDirective: false,
    },
  },
  runtimeConfig: {
    public: {
      apiDev: process.env.NUXT_PUBLIC_API_DEV,
      apiProd: process.env.NUXT_PUBLIC_API_PROD,
      apiFeatDev: process.env.NUXT_PUBLIC_API_FEAT_DEV,
      apiFeatProd: process.env.NUXT_PUBLIC_API_FEAT_PROD,
    },
  },
});
