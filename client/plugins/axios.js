// plugins/axios
export default function ({ store, redirect, req, router, $axios }) {
  $axios.defaults.baseURL = 'http://localhost:3000/api/'
  $axios.interceptors.request.use((config) => {
    return config
  })
  $axios.interceptors.response.use(
    (res) => {
      // if (!response.data.success) {
      // return Promise.reject(response.data.msg)
      // } else {
      return Promise.resolve(res.data)
      // }
    },
    (err) => {
      // const errinfo = error.response.data

      return Promise.reject(err)
    }
  )
}
