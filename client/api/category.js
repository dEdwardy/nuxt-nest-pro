import instance from '../utils/service'

export const getCategories = () => instance('/category', { method: 'GET' })
