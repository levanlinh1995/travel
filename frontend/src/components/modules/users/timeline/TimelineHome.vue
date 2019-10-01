<template>
  <v-row justify="center">
    <v-col cols="5">
      <left-side-bar></left-side-bar>
    </v-col>
    <v-col cols="7">
      <create-new-post></create-new-post>
      <post-list :posts="posts"></post-list>
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
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
import PostList from './posts/PostList'
import CreateNewPost from '../../posts/CreateNewPost'
import LeftSideBar from './LeftSideBar'

export default {
  components: {
    InfiniteLoading,
    PostList,
    CreateNewPost,
    LeftSideBar
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
      posts: 'user/posts/postList'
    })
  },
  methods: {
    ...mapActions({
      getPostList: 'user/posts/getPostList',
      clearPostList: 'user/posts/clearPostList'
    }),
    infiniteHandler ($state) {
      this.getPostList({ page: this.page })
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
