<template>
  <div>
    <v-list>
      <comment-item
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      ></comment-item>
    </v-list>
  </div>
</template>

<script>
import CommentItem from './CommentItem'

export default {
  components: {
    CommentItem
  },
  props: {
    comments: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style>
</style>
