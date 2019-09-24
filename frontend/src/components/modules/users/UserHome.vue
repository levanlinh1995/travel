<template>
  <div>
      <div>
          <user-header></user-header>
      </div>
      <div>
          <router-view/>
      </div>
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
