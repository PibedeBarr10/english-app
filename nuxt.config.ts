// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    storage: {
      kv: { driver: 'vercelKV' }
    }
  },
  devtools: { enabled: true }
})
