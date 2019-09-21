<template>
  <div>
    <post-list :posts="posts"></post-list>
  </div>
</template>

<script>
import PostList from './posts/PostList'

export default {
  components: {
    PostList
  },
  data () {
    return {
      posts: [
        {
          id: 1,
          body: ''
        }
      ]
    }
  }
}
</script>

<style>

</style>
