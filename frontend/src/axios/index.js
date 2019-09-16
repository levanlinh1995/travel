import axios from 'axios'

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL || 'http://localhost'
})

http.interceptors.request.use(function (config) {
  let token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
}, function (error) {
  return Promise.reject(error)
})

http.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export default http
