// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    // Transition全域設定
    // 不換layout只換頁
    pageTransition: { name: 'fade', mode: 'out-in' },
    // 換layout
    layoutTransition: { name: 'fade', mode: 'out-in' },
  },
  runtimeConfig: {
    apiSecret: {
      apiBase: process.env.APP_ENDPOINT,
    }, // NUXT_API_SECRET 有在env的話 apiBase 會優先選即便這在沒設定，並且只吃apiBase無法擴充
    public: {
      BASE_URL: process.env.BASE_URL,
      apiBase: process.env.APP_ENDPOINT,
      irsEntpoint: process.env.IRS_ENDPOINT,
      irsAccount: process.env.IRS_ACCOUNT,
      irsPassword: process.env.IRS_PASSWORD,
      appEntpoint: process.env.APP_ENDPOINT,
      appAccount: process.env.APP_ACCOUNT,
      appPassowrd: process.env.APP_PASSWORD,
    }, // NUXT_PUBLIC_API_BASE 有在env的話 apiBase 會優先選，即便沒設定這邊
  },
  modules: ['@pinia/nuxt', '@nuxthq/ui'],
  typescript: {
    strict: true,
  },
  nitro: {
    storage: {
      redis: {
        driver: 'redis',
        /* redis connector options */
        port: 6379, // Redis port
        host: '127.0.0.1', // Redis host
        db: 0, // Defaults to 0
        // tls: {}, // tls/ssl
      },
    },
  },
})
