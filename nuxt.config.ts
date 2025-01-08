// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  app:{
    head: {
      title: 'Spicy Gossip Hub',
      meta: [{
        name: 'description', content: 'Know the latest Gist and Gossip Today!'
      }],
      link: [{
        rel: 'stylesheet', href:'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@400;500;600&display=swap'
      }]
    }
  }
})
