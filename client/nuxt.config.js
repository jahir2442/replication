export default {
     // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
     webpackDevMiddleware: (config) => {
          config.watchOptions.poll = 300;
          return config;
     },
     ssr: false,

     env: {
          baseURL: process.env.BASE_URL || 'http://localhost:4000'
     },

     // Global page headers: https://go.nuxtjs.dev/config-head
     head: {
          title: 'Proyect-DB',
          htmlAttrs: {
               lang: 'en',
          },
          meta: [
               { charset: 'utf-8' },
               { name: 'viewport', content: 'width=device-width, initial-scale=1' },
               { hid: 'description', name: 'description', content: '' },
          ],
          link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
          {
               rel: 'stylesheet',
               href: `https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css`
          },
          {
               rel: 'stylesheet',
               href: `https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css`
          },
          {
               rel: 'stylesheet',
               href: `https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css`
          },
          { src: `https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js` },
          { src: `https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js` }]
     },

     // Global CSS: https://go.nuxtjs.dev/config-css
     css: [],

     // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
     plugins: [],

     // Auto import components: https://go.nuxtjs.dev/config-components
     components: true,

     // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
     buildModules: [
          // https://go.nuxtjs.dev/eslint
          // Simple usage
          '@nuxtjs/vuetify'
     ],

     // Modules: https://go.nuxtjs.dev/config-modules
     modules: [
          // https://go.nuxtjs.dev/bootstrap
          'bootstrap-vue/nuxt',
          // https://go.nuxtjs.dev/axios
          '@nuxtjs/axios',

          'cookie-universal-nuxt'
     ],

     // Axios module configuration: https://go.nuxtjs.dev/config-axios
     axios: {
          baseURL: process.env.BASE_URL,
          headers: {
               common: {
                    'Accept': 'application/json, text/plain, */*'
               }
          }
     },

     // Build Configuration: https://go.nuxtjs.dev/config-build
     build: {},
}
