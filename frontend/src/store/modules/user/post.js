import axios from '../../../axios/index'

const state = {
  posts: []
}

const getters = {
}

const mutations = {
}

const actions = {
  getPostList ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/user/posts')
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
