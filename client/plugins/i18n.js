import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'zh-CN',
    messages: {
      'zh-CN': require('@/locales/zh-CN.json'),
      'en-US': require('@/locales/en-US.json'),
    },
  })

  app.i18n.path = (link) => {
    // 如果是默认语言，就省略
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }

    return `/${app.i18n.locale}/${link}`
  }
}
