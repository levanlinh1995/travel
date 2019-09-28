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

      <v-card-title>{{ storyTitle }}</v-card-title>

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
