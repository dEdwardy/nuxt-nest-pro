import axios from 'axios'
import { Message } from 'element-ui'
const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 15000,
})
instance.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  (res) => {
    if (res.data && res.data.data && res.data.data.error) {
      Message.error(res.data.data.error)
      return Promise.reject(res.data.data.error)
    }
    return res.data
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default instance
