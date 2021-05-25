export default (axios) => ({
  login(params) {
    return axios.post('/login', params)
  },
})
