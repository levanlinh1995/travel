<template>
  <div>
    <parallax />
    <v-container>
      <signup-section />
    </v-container>
  </div>
</template>

<script>
import Parallax from './Parallax'
import SignupSection from './SignupSection'

export default {
  components: {
    Parallax,
    SignupSection
  }
}
</script>

<style>

</style>
