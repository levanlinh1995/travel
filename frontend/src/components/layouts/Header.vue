<template>
  <div>
    <v-app-bar
      app
      color="blue darken-3"
      dark
    >
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-3"
      >
        <span class="hidden-sm-and-down">Phượt</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="fa-search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-toolbar-items>
          <v-btn v-if="!isAuthenticated" text @click="loginDialog = true">Login</v-btn>
          <v-btn v-if="isAuthenticated" text>Logout</v-btn>
        </v-toolbar-items>
      <!-- <v-btn icon>
        <v-icon>fa-bell</v-icon>
      </v-btn> -->
    </v-app-bar>

    <!-- login modal -->
    <login-modal v-model="loginDialog" />
  </div>
</template>

<script>
import LoginModal from '../auth/LoginModal'
import { mapGetters } from 'vuex'

export default {
  components: {
    LoginModal
  },
  data () {
    return {
      loginDialog: false
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    })
  }
}
</script>
