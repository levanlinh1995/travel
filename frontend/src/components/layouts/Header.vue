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
        <router-link :to="{ name: 'home' }" tag="span" style="cursor: pointer">
          Phượt
        </router-link>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="fa-search"
        label="Search"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          v-if="isAuthenticated"
          text
          class="subtitle-2"
          :to="{ name: 'story-list' }"
        >
          Journey Stories
        </v-btn>
        <v-btn
          text
          v-if="!isAuthenticated"
          @click="openLoginModal"
        >
        Login
        </v-btn>
        <v-btn v-if="!isAuthenticated" text @click="openSignupModal">Signup</v-btn>
      </v-toolbar-items>
      <div v-if="isAuthenticated">
        <v-btn icon>
          <v-icon>fa-bell</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>fa-comment-dots</v-icon>
        </v-btn>

        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-list-item-avatar
              style="cursor: pointer"
              v-if="isAuthenticated"
              v-on="on"
              color="white"
            >
              <v-avatar>
                <img v-if="AvatarUrl" :src="AvatarUrl">
              </v-avatar>
            </v-list-item-avatar>
          </template>
          <v-list dense>
            <v-subheader>SETTING</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item @click="logout">
                <v-list-item-icon>
                  <v-icon>fa-sign-out-alt</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <!-- login modal -->
    <login-modal v-model="loginModal.dialog" :tab.sync="loginModal.tab"/>
  </div>
</template>

<script>
import LoginModal from '../auth/LoginModal'
import { mapGetters, mapActions } from 'vuex'
import helpers from '@/helpers/helpers'

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
      isAuthenticated: 'auth/isAuthenticated',
      authenticatedUser: 'auth/authenticatedUser'
    }),
    AvatarUrl () {
      let src = this.authenticatedUser.profile.data.avatarUrl
      if (!src) {
        src = helpers.defaultAvatarURL
      }
      return src
    }
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
