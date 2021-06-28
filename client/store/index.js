import { getCategories } from '@/api/category'
import { auth, getDict } from '@/api/user'
export const state = () => ({
  username: '',
  locale: '',
  locales: ['zh-CN', 'en-US'],
  uinfo: {},
  dict: {},
  category: [],
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
  SET_CATEGORY(state, category) {
    state.category = category
  },
  CLOSE_AD(state, id) {
    const idx = state.dict.ad.findIndex((item) => item.id === id)[0]
    state.dict.ad.splice(idx, 1)
  },
}
export const actions = {
  async login({ commit }, data) {
    try {
      const res = await auth(data)
      const [res2] = await Promise.all([getCategories()])
      console.log(res.data, res2.data)
      commit('SET_USERINFO', res.data)
      commit('SET_CATEGORY', res2.data)
      return res.data
    } catch (err) {
      console.error(err)
      return err
    }
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
