<template>
  <div id="app">
    <v-app>
      <app-header></app-header>
      <!-- Sizes your content based upon application components -->
      <v-content>
        <router-view></router-view>
      </v-content>
      <app-footer></app-footer>
    </v-app>
  </div>
</template>

<script>
import AppHeader from './components/layouts/Header'
import AppFooter from './components/layouts/Footer'

export default {
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style>
</style>
