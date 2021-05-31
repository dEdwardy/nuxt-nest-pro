import { resolve } from 'path'
import bootstrap from './.nest/main.js'
const isDev = process.env.NODE_ENV === 'development'
const config = async () => ({
  srcDir: 'client/',
  alias: {
    '@': resolve(__dirname, './client'),
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-demo01',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  serverMiddleware: isDev ? [] : [{ path: '/api', handler: await bootstrap() }],
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'reset.css',
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/styles/page-transition.css',
    '@/assets/styles/base.scss',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/i18n', // 国际化
    '@/plugins/svg-icon', // 注册 svg-icons插件文件
    '@/plugins/element-ui',
    '@/plugins/axios',
    '@/plugins/api-plugin',
    // vuex 持久化
    { src: '@/plugins/vuex-persisted', ssr: false },
    { src: '@/plugins/nuxt-quill-plugin.js', ssr: false }, // 注册vue quill editor ssr
  ],
  router: {
    middleware: 'i18n',
  },
  // 进度条样式修改
  loading: {
    color: '#1890ff',
    height: '2px',
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ['@nuxtjs/dotenv', { filename: './.env' }],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    vendor: ['vue-i18n'],
    extend(config, context) {
      // 排除 nuxt 原配置的影响,Nuxt 默认有vue-loader,会处理svg,img等
      // 找到匹配.svg的规则,然后将存放svg文件的目录排除
      const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'))
      svgRule.exclude = [resolve(__dirname, 'client/assets/icons/svg')]

      config.module.rules.push({
        test: /\.svg$/,
        // 将存放svg的目录加入到loader处理目录
        include: [resolve(__dirname, 'client/assets/icons/svg')],
        use: [
          { loader: 'svg-sprite-loader', options: { symbolId: 'icon-[name]' } },
        ],
      })
    },
  },
})
export default config
