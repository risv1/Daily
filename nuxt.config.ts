// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: 'fade',
      mode: 'out-in' 
    },
    layoutTransition: {
      name: 'slide',
      mode: 'out-in' 
    }
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    }
  ],
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@vueuse/nuxt",
    'nuxt-icon',
    "nuxt-security"
  ],
  security: {
    corsHandler: {
      origin: "*",
      methods: ['POST'],
      allowHeaders: ['Content-Type'],
    }
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
});