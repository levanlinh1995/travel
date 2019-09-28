<template>
  <div>
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
import { mapGetters, mapActions, mapMutations } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
import PostList from './posts/PostList'

export default {
  components: {
    InfiniteLoading,
    PostList
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
      posts: 'feed/posts/postList'
    })
  },
  methods: {
    ...mapMutations({
      addMorePost: 'feed/posts/addMorePost'
    }),
    ...mapActions({
      getPostList: 'feed/posts/getPostList',
      clearPostList: 'feed/posts/clearPostList'
    }),
    infiniteHandler ($state) {
      this.getPostList({ page: this.page })
        .then(res => {
          const postList = res.data.data
          if (postList.length > 0) {
            this.addMorePost(postList)
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
