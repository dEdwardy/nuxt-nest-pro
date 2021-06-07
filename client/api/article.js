import instance from '../utils/service'

export const getArticles = () => instance('/article', { method: 'POST' })
export const getArtilceById = (id) => instance(`/article/${id}`)
