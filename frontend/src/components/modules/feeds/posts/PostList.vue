<template>
  <div>
    <post-item
      class="mb-3"
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
      required: true
    }
  }
}
</script>

<style>

</style>
