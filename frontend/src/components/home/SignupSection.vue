<template>
  <div>
    <v-row align="center" justify="center" class="mb-5">
        <h2 class="display-2">Create new account</h2>
      </v-row>
      <v-row align="center" justify="center">
        <v-form
        >
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="formData.firstName"
                label="First name"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="formData.lastName"
                label="Last name"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-text-field
            v-model="formData.email"
            label="Email"
            required
            outlined
          ></v-text-field>

          <v-text-field
            v-model="formData.password"
            label="Password"
            type="password"
            required
            outlined
          ></v-text-field>

          <v-text-field
            v-model="formData.repassword"
            label="Re-password"
            type="password"
            required
            outlined
          ></v-text-field>

          <div class="text-center">
            <v-btn
              color="primary"
              type="submit"
            >
              Sign up
            </v-btn>
          </div>
        </v-form>
    </v-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repassword: ''
      }
    }
  }
}
</script>

<style>

</style>
