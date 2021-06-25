import { auth, getDict } from '@/api/user'
export const state = () => ({
  username: '',
  locale: '',
  locales: ['zh-CN', 'en-US'],
  uinfo: {},
  dict: {},
})
export const mutations = {
  LOGOUT(state) {
    state.uinfo = {}
  },
  SET_USERINFO(state, uinfo) {
    state.uinfo = uinfo
  },
  SET_DICT(state, dict) {
    state.dict = dict
  },
  SET_USERNAME(state, username) {
    state.username = username
  },
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },
  SET_LOCALES(state, locales) {
    state.locales = locales
  },
}
export const actions = {
  login({ commit }, data) {
    return auth(data)
      .then((res) => {
        commit('SET_USERINFO', res.data)
        return res.data
      })
      .catch((e) => {
        console.error(e)
        return Promise.reject(e)
      })
  },
  getDict({ commit }) {
    return getDict()
      .then(({ data }) => {
        commit('SET_DICT', data)
      })
      .catch((e) => {
        console.error(e)
        return Promise.reject(e)
      })
  },
}
