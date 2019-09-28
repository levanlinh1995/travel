<template>
  <v-row justify="center">
    <v-col cols="5">
      <left-side-bar></left-side-bar>
    </v-col>
    <v-col cols="7">
      <post-list :posts="posts"></post-list>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PostList from './posts/PostList'
import LeftSideBar from './LeftSideBar'

export default {
  components: {
    PostList,
    LeftSideBar
  },
  computed: {
    ...mapGetters({
      posts: 'user/posts/postList'
    })
  },
  created () {
    this.getPostList()
  },
  methods: {
    ...mapActions({
      getPostList: 'user/posts/getPostList'
    })
  }
}
</script>

<style>

</style>
