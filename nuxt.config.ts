// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    // typeCheck: true,
    // strict: true,
  },
  nitro: {
    storage: {
      kv: { driver: 'vercelKV' },
    },
  },
  devtools: { enabled: true },
})
