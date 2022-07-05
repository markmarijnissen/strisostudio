export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false,
  server: {
    host: '0.0.0.0',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Striso Studio',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [ "@/assets/pure.css","@/assets/style.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    // '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    "nuxt-custom-elements",
    "@nuxt/content"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  router: {
    base: "/"
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  content: {

  },

  customElements: {
    buildDir: `dist/lib`,
    modern: true,
    entries: [
      {
        name: "striso",
        tags: [
          // Striso
          "DCompose",
          "StrisoBoard",
          "StrisoBoardCasing",
          "StrisoControls",
          "StrisoButton",
          "StrisoMotionSensors",
          "StrisoSynth",
          "StrisoNote",
          "StrisoVelocitySlider",
          "StrisoEventLog",

          // Midi
          "MidiInput",
          "MidiOutput",
          "MidiPlayer",
          
          // UI / utility
          "EventButton",
          "EventGate",
         
          // Peer to peer
          "PeerId",
          "PeerSend",
          "PeerConnection",
          "PeerConnectionList"
        ].map(name => ({
          name,
          path: `@/components/${name}.vue`
        }))
      },
      {
        name: "faust-ide",
        tags: ["FaustIdeIntegration", "MidiInput", "StrisoBoard", "PeerConnection"].map(name => ({
          name,
          path: `@/components/${name}.vue`
        }))
      }
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  modern: 'client',
  env: {
    build: Date.now()
  },
  generate: {
    async routes() {
      const { $content } = require('@nuxt/content')
      const files = await $content({ deep: true }).only(['path']).fetch()
      return files.map(file => file.path.replace('/index','/'))
    }
  }
}
