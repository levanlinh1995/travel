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
    const postId = payload.postId

    const index = findIndex(state.posts, function (o) {
      return o.id === postId
    })

    if (index !== -1) {
      state.posts[index].likedByUser = true
      state.posts[index].likeCount++
    }
  },
  unlikePost (state, payload) {
    const postId = payload.postId
    const postIndex = findIndex(state.posts, function (o) {
      return o.id === postId
    })

    state.posts[postIndex].likedByUser = false
    state.posts[postIndex].likeCount--
  },
  addNewComment (state, payload) {
    const postId = payload.postId
    const comment = payload.comment

    const index = findIndex(state.posts, function (o) {
      return o.id === postId
    })

    if (index !== -1) {
      state.posts[index].commentCount++
      state.posts[index].comments.data.unshift(comment)
    }
  }
}

const actions = {
  getFeedPostList ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('feed/posts', {
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
  getUserPostList ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('user/posts', {
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
  createNewPost ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post('/user/posts', payload)
        .then(res => {
          const post = res.data.data
          commit('addOneMorePostAtBegin', post)
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
  },
  createNewComment ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`/post/${payload.postId}/add-comment`, {
        content: payload.content
      })
        .then(res => {
          const comment = res.data.data
          commit('addNewComment', {
            postId: payload.postId,
            comment
          })
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
