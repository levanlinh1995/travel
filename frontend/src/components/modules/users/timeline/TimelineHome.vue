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
import { mapActions } from 'vuex'
import PostList from './posts/PostList'
import LeftSideBar from './LeftSideBar'

export default {
  components: {
    PostList,
    LeftSideBar
  },
  data () {
    return {
      posts: []
    }
  },
  created() {
    this.getPostList()
      .then(res => {
        this.posts = res.data.data
      })
      .catch(error => console.log(error))
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
