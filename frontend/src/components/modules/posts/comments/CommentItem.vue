<template>
  <v-list-item
    three-line
    >
    <v-list-item-avatar v-if="AvatarUrl">
        <v-img :src="AvatarUrl"></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
        <v-list-item-title class="blue--text text--darken-3 font-weight-medium">{{ fullName }}</v-list-item-title>
        <div class="grey--text text--darken-2 body-2" style="white-space: pre;">{{ commentContent }}</div>
        <v-list-item-subtitle>
          <v-btn
            icon
            small
          >
            <v-icon
              small
            >fa-thumbs-up</v-icon>
          </v-btn>
          <v-btn
            text
            small
          >
            Reply
          </v-btn>
        </v-list-item-subtitle>
    </v-list-item-content>
    </v-list-item>
</template>

<script>
import helpers from '@/helpers/helpers'

export default {
  props: {
    comment: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    AvatarUrl () {
      let src = this.comment.user.data.profile.data.avatarUrl
      if (!src) {
        src = helpers.defaultAvatarURL
      }
      return src
    },
    fullName () {
      return this.comment.user.data.profile.data.fullName
    },
    commentContent () {
      return this.comment.content
    }
  }
}
</script>

<style>
</style>
