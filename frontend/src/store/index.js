import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// import modules
import authModule from './modules/auth/index'
import userModule from './modules/user/index'

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
    auth: authModule,
    user: userModule
  }
})
