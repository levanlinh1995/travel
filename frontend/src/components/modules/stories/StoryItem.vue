<template>
  <div>
    <v-card
      class="mx-auto"
    >
      <v-img
        v-if="storyFeaturedImageUrl"
        class="white--text"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
      </v-img>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">{{ storyTitle }}</v-list-item-title>
          <v-list-item-subtitle>Mon, 12:30 PM, Mostly sunny</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <span class="text--primary">
          {{ storyContent }}
        </span>
      </v-card-text>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn
          text
          color="orange"
        >
          Read more
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    story: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    storyTitle () {
      return this.story.title
    },
    storyFeaturedImageUrl () {
      return this.story.featuredImageUrl
    },
    storyContent () {
      return this.story.content
    },
    storyCreatedAt () {
      return this.story.createdAt
    },
    storyUpdatedAt () {
      return this.story.updatedAt
    }
  }
}
</script>

<style>

</style>
