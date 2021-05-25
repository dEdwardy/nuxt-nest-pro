export const state = () => ({
  username: '',
  locale: '',
  locales: ['zh-CN', 'en-US'],
})

export const mutations = {
  SET_USERNAME(state, username) {
    state.username = username
  },
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },
}
