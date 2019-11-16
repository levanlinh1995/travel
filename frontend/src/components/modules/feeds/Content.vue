<template>
  <div>
    <create-new-post></create-new-post>
    <post-list
      :posts="posts"
    ></post-list>
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
import CreateNewPost from '../posts/CreateNewPost'
import PostList from '../posts/PostList'

export default {
  components: {
    InfiniteLoading,
    PostList,
    CreateNewPost
  },
  data () {
    return {
      page: 1
    }
  },
  created () {
    this.clearPostList()
  },
  computed: {
    ...mapGetters({
      posts: 'post/postList'
    })
  },
  methods: {
    ...mapActions({
      getFeedPostList: 'post/getFeedPostList',
      clearPostList: 'post/clearPostList'
    }),
    infiniteHandler ($state) {
      this.getFeedPostList({ page: this.page })
        .then(res => {
          const postList = res.data.data
          if (postList.length > 0) {
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
