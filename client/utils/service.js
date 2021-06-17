import axios from 'axios'
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
  ({ data }) => {
    if (data?.data?.error) return Promise.reject(data.data.error)
    return data
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default instance
