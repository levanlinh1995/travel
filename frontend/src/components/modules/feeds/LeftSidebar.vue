<template>
  <div>
    <v-list class="elevation-2" dense>
      <v-list-item @click="goToUserPage">
        <v-list-item-avatar color="white">
          <v-avatar>
            <img v-if="AvatarUrl" :src="AvatarUrl" />
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-title>
          {{ fullName }}
        </v-list-item-title>
      </v-list-item>
      <v-subheader>EXPLORE</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item>
          <v-list-item-icon>
            <v-icon>fa-bookmark</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Saved</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import helpers from '@/helpers/helpers'

export default {
  computed: {
    ...mapGetters({
      authenticatedUser: 'auth/authenticatedUser'
    }),
    fullName () {
      return this.authenticatedUser.profile ? this.authenticatedUser.profile.data.fullName : ''
    },
    AvatarUrl () {
      let src = this.authenticatedUser.profile ? this.authenticatedUser.profile.data.avatarUrl : ''
      if (!src) {
        src = helpers.defaultAvatarURL
      }
      return src
    }
  },
  methods: {
    goToUserPage () {
      this.$router.push({ name: 'user-timeline-home', params: { username: this.authenticatedUser.username } })
    }
  }
}
</script>

<style>

</style>
