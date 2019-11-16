<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="3">
        <left-side-bar></left-side-bar>
      </v-col>
      <v-col cols="5">
        <feed-content></feed-content>
      </v-col>
      <v-col cols="4">
        <right-side-bar></right-side-bar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FeedContent from './Content'
import LeftSideBar from './LeftSidebar'
import RightSideBar from './RightSidebar'

export default {
  components: {
    FeedContent,
    LeftSideBar,
    RightSideBar
  }
}
</script>

<style>

</style>
