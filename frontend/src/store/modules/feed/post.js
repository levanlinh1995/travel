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
  addMorePost (state, payload) {
    if (Array.isArray(payload)) {
      state.posts.push(...payload)
    } else {
      state.posts.push(payload)
    }
  },
  clearPosts (state) {
    state.posts = []
  }
}

const actions = {
  getPostList ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/feed/posts', {
        params: {
          include: 'author.profile',
          page: payload.page
        }
      })
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
  },
  clearPostList ({ commit }) {
    commit('clearPosts')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
