import { resolve } from 'path'
import bootstrap from './.nest/main.js'
// const isDev = process.env.NODE_ENV === 'development'

const config = async () => ({
  srcDir: 'client/',
  buildDir: process.env.NUXT_ENV === 'ssr' ? '.nuxt-ssr' : '.nuxt-csr',
  ssr: process.env.NUXT_ENV === 'ssr',
  alias: {
    '@': resolve(__dirname, './client'),
  },
  server: {
    port: 4002,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'jj',
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

  serverMiddleware:
    process.env.NUXT_ENV === 'ssr'
      ? [{ path: '/api', handler: await bootstrap() }]
      : [],
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/common/index.scss',
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
    '@/plugins/antd-vue',
    // vuex 持久化
    { src: '@/plugins/vuex-persisted', ssr: false },
    { src: '@/plugins/nuxt-quill-plugin', ssr: false }, // 注册vue quill editor ssr
  ],
  router: {
    linkActiveClass: 'active-route',
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
    // '@nuxtjs/axios',
    ['@nuxtjs/dotenv', { filename: '../.env' }],
    'nuxt-winston-log',
    'nuxt-ssr-cache',
  ],
  cache: {
    useHostPrefix: false,
    store: {
      type: 'memory',
      // type: 'redis',
      // host: '47.112.172.255',
      // port: 6380,
      // auth_pass: 'Onelovealive0*',
      // db: 2,
      ttl: 10 * 60,
      // configure: [
      //   ['maxmemory', '200mb'],
      //   ['maxmemory-policy', 'allkeys-lru'],
      // ],
    },
    pages: [
      '/',
      // '/index',
      // '/_category/index',
      // '/_category/_tag/index',
      // '/post/_id',
    ],
  },
  // axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // parallel: true,
    transpile: [/^element-ui/, /^lodash-es/],
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
