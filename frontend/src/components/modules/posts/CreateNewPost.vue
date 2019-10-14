<template>
  <v-card class="mb-3">
    <v-card-title class="grey lighten-3">
      <div class="title">Create post</div>
    </v-card-title>
    <v-divider></v-divider>
    <div class="d-flex flex-row pa-2 grey--text">
      <div>
        <v-avatar>
          <img v-if="AvatarUrl" :src="AvatarUrl">
        </v-avatar>
      </div>
      <div style="width: 100%">
        <v-form>
          <v-textarea
            auto-grow
            full-width
            rows="2"
            v-model="formData.content"
            label="Write something..."
          ></v-textarea>
        </v-form>
      </div>
    </div>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <v-chip
        class="mr-2"
      >
        <v-icon left>fa-photo-video</v-icon>
        Photo/Video
      </v-chip>
      <v-chip
        class="mr-2"
      >
        <v-icon left>fa-user-tag</v-icon>
        Tag friends
      </v-chip>
    </v-card-text>
    <v-card-actions class="d-flex justify-center">
      <v-btn
        :disabled="formData.content.trim() === ''"
        rounded
        small
        width="400px"
        color="primary"
        @click="submitForm"
      >create</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import helpers from '@/helpers/helpers'

export default {
  data () {
    return {
      formData: {
        content: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      authenticatedUser: 'auth/authenticatedUser'
    }),
    AvatarUrl () {
      let src = this.authenticatedUser.profile ? this.authenticatedUser.profile.data.avatarUrl : null
      if (!src) {
        src = helpers.defaultAvatarURL
      }
      return src
    }
  },
  methods: {
    ...mapActions({
      createNewPost: 'post/createNewPost'
    }),
    submitForm () {
      this.createNewPost(this.formData)
        .then(res => {
          this.formData.content = ''
        })
        .catch(error => console.log(error))
    }
  }
}
</script>

<style>

</style>
