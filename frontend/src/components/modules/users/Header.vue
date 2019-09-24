<template>
  <div>
    <v-card tile style="position: relative">
      <v-btn
        width="130px"
        height="130px"
        absolute
        dark
        fab
        bottom
        left
        color="white"
        style="bottom: 30px"
      >
        <v-avatar
          width="130px"
          height="130px"
        >
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
          >
        </v-avatar>
      </v-btn>
      <v-img
        class="white--text"
        height="300px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
      </v-img>
      <v-card-actions >
        <v-tabs
          fixed-tabs
        >
          <v-tab disabled></v-tab>
          <v-tab :to="{ name: 'user-timeline-home' }" exact>
            Timeline
          </v-tab>
          <v-tab :to="{ name: 'user-about-home' }" exact>
            About
          </v-tab>
          <v-tab :to="{ name: 'user-friends-home' }" exact>
            Friends
          </v-tab>
          <v-tab :to="{ name: 'user-photos-home' }" exact>
            Photos
          </v-tab>
        </v-tabs>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
