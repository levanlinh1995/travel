<template>
  <div>
    <v-list class="elevation-2" dense>
      <v-list-item @click="goToUserPage">
        <v-list-item-avatar>
          <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>Le Linh</v-list-item-title>
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

export default {
  computed: {
    ...mapGetters({
      authenticatedUser: 'auth/authenticatedUser'
    })
  },
  methods: {
    goToUserPage () {
      this.$router.push({ name: 'user-timeline-home', params: { username: this.authenticatedUser.attributes.username } })
    }
  }
}
</script>

<style>

</style>
