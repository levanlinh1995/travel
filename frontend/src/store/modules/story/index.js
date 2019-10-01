import axios from '@/axios/index'

const state = {
  stories: []
}

const getters = {
  storyList (state) {
    return state.stories
  }
}

const mutations = {
  addMoreStory (state, payload) {
    if (Array.isArray(payload)) {
      state.stories.push(...payload)
    } else {
      state.stories.push(payload)
    }
  },
  clearStories (state) {
    state.stories = []
  }
}

const actions = {
  getStoryList ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/blog/list', {
        params: {
          page: payload.page
        }
      })
        .then(res => {
          const storyList = res.data.data
          commit('addMoreStory', storyList)
          resolve(res)
        })
        .catch(error => reject(error))
    })
  },
  clearStoryList ({ commit }) {
    commit('clearStories')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
