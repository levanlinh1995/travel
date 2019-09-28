<template>
  <div>
    <v-card
      class="mx-auto"
    >
      <v-list-item>
        <v-list-item-avatar
          color="white"
          style="cursor: pointer"
        >
          <v-avatar>
            <img v-if="AvatarUrl" :src="AvatarUrl">
          </v-avatar>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="headline" style="cursor: pointer">
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
        <v-btn icon>
          <v-icon>fa-heart</v-icon>
        </v-btn>
        <span class="subheading mr-2">256</span>
        <v-btn icon>
          <v-icon>fa-comment-alt</v-icon>
        </v-btn>
        <span class="subheading mr-2">15</span>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import helpers from '@/helpers/helpers'

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
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
    }
  }
}
</script>

<style>

</style>
