import axios from 'axios'
import store from '../store/index'
import router from '../router/index'

const axiosInstant = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost'
})

axiosInstant.interceptors.request.use(function (config) {
  let token = store.getters['auth/getToken']
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
}, function (error) {
  return Promise.reject(error)
})

axiosInstant.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
    if (!(error.response.data.error && error.response.data.error.type === 'login')) {
      store.commit('auth/clearUserInfo')

      if (router.currentRoute.name !== 'login') {
        router.push({ name: 'login' })
      }
    }
  }

  return Promise.reject(error)
})

export default axiosInstant
