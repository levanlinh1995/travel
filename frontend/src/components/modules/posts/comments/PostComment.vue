<template>
  <div>
    <v-divider></v-divider>

    <!-- create a comment -->
    <v-list-item
      three-line
    >
      <v-list-item-avatar v-if="AvatarUrl">
        <v-img :src="AvatarUrl"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-form>
              <v-textarea
                @keydown.enter.exact.prevent="sumbitComment"
                v-model="formData.content"
                auto-grow
                rows="1"
                label="Write a comment..."
              ></v-textarea>
          </v-form>
      </v-list-item-content>
    </v-list-item>

    <!-- comment list -->
    <comment-list :comments="comments"></comment-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CommentList from './CommentList'
import helpers from '@/helpers/helpers'

export default {
  components: {
    CommentList
  },
  props: {
    post: {
      type: Object,
      default () {
        return {}
      }
    },
    comments: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      formData: {
        content: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      authenticatedUser: 'auth/authenticatedUser'
    }),
    AvatarUrl () {
      let src = this.authenticatedUser.profile ? this.authenticatedUser.profile.data.avatarUrl : null
      if (!src) {
        src = helpers.defaultAvatarURL
      }
      return src
    }
  },
  methods: {
    ...mapActions({
      createNewComment: 'post/createNewComment'
    }),
    sumbitComment () {
      if (this.formData.content.trim() !== '') {
        this.createNewComment({
          postId: this.post.id,
          content: this.formData.content
        })
          .then(res => {
            this.formData.content = ''
          })
          .catch(console.error())
      } else {
        return false
      }
    }
  }
}
</script>

<style>
</style>
