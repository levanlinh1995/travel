import axios from '../../../axios/index'

const state = {
  token: null,
  user: {}
}

const getters = {
  getToken (state) {
    return state.token
  },
  authenticatedUser (state) {
    return state.user
  },
  isAuthenticated (state) {
    return state.token !== null
  }
}

const mutations = {
  storeUserInfo (state, payload) {
    state.token = payload.token
    state.user = payload.user
  },
  clearUserInfo (state) {
    state.token = null
    state.user = {}
  }
}

const actions = {
  signup ({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios.post('/auth/signup', data)
        .then(res => {
          const token = res.data.access_token
          const user = res.data.user.data
          commit('storeUserInfo', {
            token,
            user
          })
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  login ({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios.post('/auth/login', data)
        .then(res => {
          const token = res.data.access_token
          const user = res.data.user.data
          
          commit('storeUserInfo', {
            token,
            user
          })
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.post('/auth/logout')
        .then(res => {
          commit('clearUserInfo')
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  checkEmailExists ({ commit }, email) {
    return new Promise((resolve, reject) => {
      axios.post('/auth/check-email-exists', { email })
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  checkUsernameExists ({ commit }, username) {
    return new Promise((resolve, reject) => {
      axios.post('/auth/check-username-exists', { username })
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
