import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// import modules
import Auth from './modules/auth/auth'

Vue.use(Vuex)

const state = {

}

const mutations = {

}

const actions = {

}

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state,
  mutations,
  actions,
  modules: {
    auth: Auth
  }
})
