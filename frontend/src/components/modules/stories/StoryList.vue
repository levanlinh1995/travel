<template>
  <div>
    <v-parallax
      height="300"
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-row
        align="center"
        justify="center"
      >
        <h1 class="display-2 font-weight-thin mb-4">Journey Stories</h1>
      </v-row>
    </v-parallax>

    <v-container>
      <v-row justify="center">
        <v-col cols="7">
          <story-item
            v-for="story in stories"
            :key="story.id"
            :story="story"
            class="mb-3"
          >
          </story-item>
          <infinite-loading @distance="1" @infinite="infiniteHandler">
            <div slot="spinner">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
            <div slot="no-more">No more data.</div>
            <div slot="no-results">No results.</div>
          </infinite-loading>
        </v-col>
        <v-col cols="4">
          <v-card>
            <v-card-title>Sponsor</v-card-title>
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
              height="194"
            ></v-img>

            <v-card-text>
              Visit ten places on our planet that are undergoing the biggest changes today.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
import StoryItem from './StoryItem'

export default {
  components: {
    StoryItem,
    InfiniteLoading
  },
  data () {
    return {
      page: 1
    }
  },
  created () {
    this.clearStoryList()
  },
  computed: {
    ...mapGetters({
      stories: 'story/storyList'
    })
  },
  methods: {
    ...mapActions({
      getStoryList: 'story/getStoryList',
      clearStoryList: 'story/clearStoryList'
    }),
    infiniteHandler ($state) {
      this.getStoryList({ page: this.page })
        .then(res => {
          const storyList = res.data.data
          if (storyList.length > 0) {
            $state.loaded()
          } else {
            $state.complete()
          }

          this.page++
        })
    }
  }
}
</script>

<style>

</style>
