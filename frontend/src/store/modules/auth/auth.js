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

}

const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
