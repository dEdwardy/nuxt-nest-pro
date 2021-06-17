import instance from '../utils/service'

export const getArticles = (params = {}) =>
  instance('/article', { method: 'POST', data: params })
export const getArtilceById = (id) => instance(`/article/${id}`)
