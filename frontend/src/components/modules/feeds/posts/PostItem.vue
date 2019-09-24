<template>
  <div>
    <v-card
      class="mx-auto"
    >
      <v-list-item>
        <v-list-item-avatar color="grey darken-1">
          <v-img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="headline">Our Kurt Wagner</v-list-item-title>
          <v-list-item-subtitle>1h ago</v-list-item-subtitle>
        </v-list-item-content>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              v-on="on"
            >
              <v-icon small>fa-ellipsis-v</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item-group color="primary">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>fa-bookmark</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>save</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-list-item>

      <v-card-text>
        Visit ten places on our planet that are undergoing the biggest changes today.
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>fa-heart</v-icon>
        </v-btn>
        <span class="subheading mr-2">256</span>
        <v-btn icon>
          <v-icon>fa-comment-alt</v-icon>
        </v-btn>
        <span class="subheading mr-2">15</span>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
