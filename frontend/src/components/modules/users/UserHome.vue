<template>
  <div>
    <v-row justify="center" no-gutters>
      <v-col cols="8">
        <user-header></user-header>
        <router-view/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import UserHeader from './Header'

export default {
  components: {
    UserHeader
  }
}
</script>

<style>

</style>
