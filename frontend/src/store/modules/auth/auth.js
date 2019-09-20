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
  storeUser (state, payload) {
    state.token = payload.token
  }
}

const actions = {
  signup ({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios.post('/auth/signup', data)
        .then(res => {
          const token = res.data.access_token
          commit('storeUser', {
            token
          })
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
