<template>
  <v-container
    fluid
    fill-height
  >
    <v-layout
      align-center
      justify-center
    >
      <v-flex
        xs12
        sm8
        md4
      >
        <v-card class="elevation-12"
        >
          <v-card-title class="headline justify-center primary--text font-weight-medium">Login</v-card-title>
          <v-card-text>
            <v-container>
              <div v-if="errors.length > 0" class="red--text mb-3">
                {{ errors[0] }}
              </div>
              <v-form
              >
                <v-text-field
                  v-model="formData.email"
                  label="Email"
                  required
                  outlined
                  append-icon="fa-user"
                  :error-messages="emailErrors"
                  @input="$v.formData.email.$touch()"
                  @blur="$v.formData.email.$touch()"
                ></v-text-field>

                <v-text-field
                  v-model="formData.password"
                  label="Password"
                  type="password"
                  required
                  outlined
                  append-icon="fa-lock"
                  :error-messages="passwordErrors"
                  @input="$v.formData.password.$touch()"
                  @blur="$v.formData.password.$touch()"
                ></v-text-field>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              class="mx-auto"
              @click="submitLogin"
              >Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      errors: [],
      formData: {
        email: '',
        password: ''
      }
    }
  },
  validations: {
    formData: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.formData.email.$dirty) return errors
      !this.$v.formData.email.email && errors.push('Must be valid e-mail')
      !this.$v.formData.email.required && errors.push('Email field is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.formData.password.$dirty) return errors
      !this.$v.formData.password.required && errors.push('Password field is required')
      return errors
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    submitLogin () {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      this.login(this.formData)
        .then(res => {
          this.$router.push({ name: 'feeds' })
        })
        .catch(error => {
          this.errors.push('Email or password is incorrect.')
          console.log(error)
        })
    }
  }
}
</script>

<style>

</style>
