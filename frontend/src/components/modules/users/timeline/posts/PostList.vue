<template>
  <div>
    <post-item
      :post="post"
      v-for="post in posts"
      :key="post.id"
    >
    </post-item>
  </div>
</template>

<script>
import PostItem from './PostItem'

export default {
  components: {
    PostItem
  },
  props: {
    posts: {
      type: Array,
      default: []
    }
  }
}
</script>

<style>

</style>