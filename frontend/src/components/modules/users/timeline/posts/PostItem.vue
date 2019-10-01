<template>
  <div>
    <v-card>
      <v-list-item>
        <v-list-item-avatar
          color="white"
        >
          <v-avatar>
            <img v-if="AvatarUrl" :src="AvatarUrl">
          </v-avatar>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="headline">
            {{ fullName }}
          </v-list-item-title>
          <v-tooltip bottom left>
            <template v-slot:activator="{ on }">
              <v-list-item-subtitle v-on="on">
                {{ postCreatedAt | moment('from')}}
              </v-list-item-subtitle>
            </template>
            <span>{{ postCreatedAt | moment('dddd, MMMM Do YYYY, h:mm:ss a')}}</span>
          </v-tooltip>
        </v-list-item-content>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              v-on="on"
            >
              <v-icon small>fa-ellipsis-v</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item-group color="primary">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>fa-bookmark</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>save</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-list-item>

      <v-card-text>
        {{ postContent }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :color="likedByUser ? 'red' : ''"
          icon
          @click="likeIt"
        >
          <v-icon>fa-heart</v-icon>
        </v-btn>
        <span class="subheading mr-2" v-if="likeCount > 0">{{ likeCount }}</span>
        <v-btn icon>
          <v-icon>fa-comment-alt</v-icon>
        </v-btn>
        <span class="subheading mr-2">15</span>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import helpers from '@/helpers/helpers'
import { find } from 'lodash'

export default {
  props: {
    post: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters({
      authenticatedUser: 'auth/authenticatedUser'
    }),
    fullName () {
      return this.post.author.data.profile.data.fullName
    },
    AvatarUrl () {
      let src = this.post.author.data.profile.data.avatarUrl
      if (!src) {
        src = helpers.defaultAvatarURL
      }
      return src
    },
    postCreatedAt () {
      return this.post.createdAt
    },
    postContent () {
      return this.post.content
    },
    likeCount () {
      return this.post.likes.data.length
    },
    likedByUser () {
      const likeArray = this.post.likes.data
      const authenticatedUserId = this.authenticatedUser.id

      const matchedElement = find(likeArray, function (o) {
        return o.user.data.id === authenticatedUserId
      })

      if (matchedElement !== undefined) {
        return true
      }

      return false
    }
  },
  methods: {
    ...mapActions({
      likePost: 'user/posts/likePost',
      unlikePost: 'user/posts/unlikePost'
    }),
    likeIt () {
      if (this.likedByUser) {
        this.unlikePost({ postId: this.post.id })
      } else {
        this.likePost({ postId: this.post.id })
      }
    }
  }
}
</script>

<style>

</style>
