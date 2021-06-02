export default (axios) => ({
  login(params) {
    return axios.post('/api/login', params)
  },
  getUserList() {
    return axios.get('/api/user')
  },
})
