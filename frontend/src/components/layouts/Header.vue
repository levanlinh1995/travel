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
          <v-btn v-if="!isAuthenticated" text @click="openLoginModal">Login</v-btn>
          <v-btn v-if="!isAuthenticated" text @click="openSignupModal">Signup</v-btn>
          <v-btn v-if="isAuthenticated" text @click="logout">Logout</v-btn>
        </v-toolbar-items>
      <!-- <v-btn icon>
        <v-icon>fa-bell</v-icon>
      </v-btn> -->
    </v-app-bar>

    <!-- login modal -->
    <login-modal v-model="loginModal.dialog" :tab.sync="loginModal.tab"/>
  </div>
</template>

<script>
import LoginModal from '../auth/LoginModal'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    LoginModal
  },
  data () {
    return {
      loginModal: {
        dialog: false,
        tab: 'tab-login'
      }
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    })
  },
  methods: {
    ...mapActions({
      logoutAction: 'auth/logout'
    }),
    openLoginModal () {
      this.loginModal.dialog = true
      this.loginModal.tab = 'tab-login'
    },
    openSignupModal () {
      this.loginModal.dialog = true
      this.loginModal.tab = 'tab-signup'
    },
    logout () {
      this.logoutAction()
        .then(res => {
          this.$router.push({ name: 'login' })
        })
        .catch(error => console.log(error))
    }
  }
}
</script>
