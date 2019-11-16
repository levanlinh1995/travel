<template>
  <div>
    <v-card
      class="mx-auto"
    >
      <v-list-item>
        <v-list-item-avatar
          color="white"
          style="cursor: pointer"
          @click="gotoUserPage"
        >
          <v-avatar>
            <img v-if="AvatarUrl" :src="AvatarUrl">
          </v-avatar>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            @click="gotoUserPage"
            class="headline blue--text text--darken-4 font-weight-regular"
            style="cursor: pointer"
          >
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

      <v-card-text class="body-2">
        {{ postContent }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          icon
          @click="likeIt"
        >
          <v-icon
            :color="likedByUser ? 'red' : ''"
          >fa-heart</v-icon>
        </v-btn>
        <span class="subheading mr-2" v-if="likeCount > 0">{{ likeCount }}</span>
        <v-btn icon>
          <v-icon>fa-comment-alt</v-icon>
        </v-btn>
        <span class="subheading mr-2" v-if="commentCount > 0">{{ commentCount }}</span>
      </v-card-actions>
      <post-comment :post="post" :comments="comments"></post-comment>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import helpers from '@/helpers/helpers'
import PostComment from './comments/PostComment'

export default {
  components: {
    PostComment
  },
  props: {
    post: {
      type: Object,
      required: true
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
      return this.post.likeCount
    },
    commentCount () {
      return this.post.commentCount
    },
    comments () {
      return this.post.comments.data
    },
    likedByUser () {
      return this.post.likedByUser
    }
  },
  methods: {
    ...mapActions({
      likePost: 'post/likePost',
      unlikePost: 'post/unlikePost'
    }),
    gotoUserPage () {
      this.$router.push({
        name: 'user-timeline-home',
        params: {
          username: this.post.author.data.username
        }
      })
    },
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
