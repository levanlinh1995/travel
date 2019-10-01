import axios from '../../../axios/index'
import { findIndex } from 'lodash'

const state = {
  posts: []
}

const getters = {
  postList (state) {
    return state.posts
  }
}

const mutations = {
  // at post to end of an array post
  addOneMorePost (state, payload) {
    if (Array.isArray(payload)) {
      state.posts.push(...payload)
    } else {
      state.posts.push(payload)
    }
  },
  // at post to begginning of an array post
  addOneMorePostAtBegin (state, payload) {
    if (Array.isArray(payload)) {
      state.posts.unshift(...payload)
    } else {
      state.posts.unshift(payload)
    }
  },
  clearPosts (state) {
    state.posts = []
  },
  likePost (state, payload) {
    const likeItem = payload.likeItem
    const postId = payload.postId

    const index = findIndex(state.posts, function (o) {
      return o.id === postId
    })

    if (index !== -1) {
      state.posts[index].likes.data.push(likeItem)
    }
  },
  unlikePost (state, payload) {
    const postId = payload.postId
    const authenticatedUserId = payload.authenticatedUserId

    const postIndex = findIndex(state.posts, function (o) {
      return o.id === postId
    })

    const likeIndex = findIndex(state.posts[postIndex].likes.data, function (o) {
      return o.user.data.id === authenticatedUserId
    })

    state.posts[postIndex].likes.data.splice(likeIndex, 1)
  }
}

const actions = {
  getPostList ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/feed/posts', {
        params: {
          page: payload.page
        }
      })
        .then(res => {
          const postList = res.data.data
          commit('addOneMorePost', postList)
          resolve(res)
        })
        .catch(error => reject(error))
    })
  },
  likePost ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`/post/${payload.postId}/like`)
        .then(res => {
          const likeItem = res.data.data
          commit('likePost', {
            postId: payload.postId,
            likeItem
          })
          resolve(res)
        })
        .catch(error => reject(error))
    })
  },
  unlikePost ({ commit, rootGetters }, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`/post/${payload.postId}/unlike`)
        .then(res => {
          commit('unlikePost', {
            postId: payload.postId,
            authenticatedUserId: rootGetters['auth/authenticatedUserId']
          })
          resolve(res)
        })
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
