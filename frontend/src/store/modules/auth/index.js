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
  authenticatedUserId (state) {
    return state.user.id
  },
  isAuthenticated (state) {
    return state.token !== null
  }
}

const mutations = {
  storeToken (state, payload) {
    state.token = payload.token
  },
  storeUserInfo (state, payload) {
    state.user = payload.user
  },
  logout (state) {
    state.token = null
    state.user = {}
  }
}

const actions = {
  signup ({ dispatch, commit }, data) {
    return new Promise((resolve, reject) => {
      axios.post('/auth/signup', data)
        .then(res => {
          const token = res.data.access_token
          dispatch('getAuthenticatedUser', token)
            .then(res => resolve(res))
            .catch(error => reject(error))
        })
        .catch(error => reject(error))
    })
  },
  login ({ dispatch, commit }, data) {
    return new Promise((resolve, reject) => {
      axios.post('/auth/login', data)
        .then(res => {
          const token = res.data.access_token
          dispatch('getAuthenticatedUser', token)
            .then(res => resolve(res))
            .catch(error => reject(error))
        })
        .catch(error => reject(error))
    })
  },
  getAuthenticatedUser ({ commit }, token) {
    return new Promise((resolve, reject) => {
      axios.post('/auth/me', { token })
        .then(res => {
          const user = res.data.data
          commit('storeUserInfo', {
            user
          })
          commit('storeToken', {
            token
          })
          resolve(res)
        })
        .catch(error => reject(error))
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.post('/auth/logout')
        .then(res => {
          commit('logout')
          resolve(res)
        })
        .catch(error => reject(error))
    })
  },
  checkEmailExists ({ commit }, email) {
    return new Promise((resolve, reject) => {
      axios.post('/auth/check-email-exists', { email })
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
  },
  checkUsernameExists ({ commit }, username) {
    return new Promise((resolve, reject) => {
      axios.post('/auth/check-username-exists', { username })
        .then(res => resolve(res))
        .catch(error => reject(error))
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
