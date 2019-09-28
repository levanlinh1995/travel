import axios from '../../../axios/index'

const state = {
  posts: []
}

const getters = {
  postList (state) {
    return state.posts
  }
}

const mutations = {
  storePostList (state, payload) {
    state.posts = payload
  }
}

const actions = {
  getPostList ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/user/posts?include=author.profile')
        .then(res => {
          const postList = res.data.data
          commit('storePostList', postList)
          resolve(res)
        })
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
