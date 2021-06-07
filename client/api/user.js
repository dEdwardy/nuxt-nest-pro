import instance from '../utils/service'

export const getUserList = () => instance('/user')
export const auth = (data) => instance('/auth/login', { method: 'POST', data })
