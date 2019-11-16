<template>
  <div>
    <v-row align="center" justify="center" class="mb-5">
        <h2 class="display-2">Create a new account</h2>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="4">
          <v-form
            @submit.prevent="submitForm"
          >
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="formData.firstName"
                  label="First name"
                  required
                  outlined
                  :error-messages="firstNameErrors"
                  @input="$v.formData.firstName.$touch()"
                  @blur="$v.formData.firstName.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="formData.lastName"
                  label="Last name"
                  required
                  outlined
                  :error-messages="lastNameErrors"
                  @input="$v.formData.lastName.$touch()"
                  @blur="$v.formData.lastName.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-text-field
              v-model.lazy="formData.email"
              label="Email"
              required
              outlined
              append-icon="fa-envelope"
              :error-messages="emailErrors"
              @input="$v.formData.email.$reset()"
              @blur="$v.formData.email.$touch()"
            ></v-text-field>

            <v-text-field
              v-model.lazy="formData.username"
              label="Username"
              required
              outlined
              append-icon="fa-user"
              :error-messages="usernameErrors"
              @input="$v.formData.username.$reset()"
              @blur="$v.formData.username.$touch()"
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

            <v-text-field
              v-model="formData.repassword"
              label="Re-password"
              type="password"
              required
              outlined
              append-icon="fa-lock"
              :error-messages="repasswordErrors"
              @input="$v.formData.repassword.$touch()"
              @blur="$v.formData.repassword.$touch()"
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
        </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, maxLength, email, sameAs, alphaNum } from 'vuelidate/lib/validators'
import passwordComplexity from '../../../plugins/vuevalidate/customValidators/passwordComplexity'

export default {
  mixins: [validationMixin],
  data () {
    return {
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        repassword: ''
      }
    }
  },
  validations: {
    formData: {
      firstName: {
        required,
        maxLength: maxLength(50)
      },
      lastName: {
        required,
        maxLength: maxLength(50)
      },
      username: {
        required,
        alphaNum,
        maxLength: maxLength(50),
        checkUsernameExists (username) {
          if (username === '') return true

          return new Promise((resolve, reject) => {
            this.$store.dispatch('auth/checkUsernameExists', username)
              .then(res => {
                resolve(res.data.data.username !== 'exist')
              })
          })
        }
      },
      email: {
        required,
        email,
        checkEmailExists (email) {
          if (email === '') return true

          return new Promise((resolve, reject) => {
            this.$store.dispatch('auth/checkEmailExists', email)
              .then(res => {
                resolve(res.data.data.email !== 'exist')
              })
          })
        }
      },
      password: {
        required,
        passwordComplexity
      },
      repassword: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  computed: {
    firstNameErrors () {
      const errors = []
      if (!this.$v.formData.firstName.$dirty) return errors
      !this.$v.formData.firstName.maxLength && errors.push(`First name may not be greater
                    than ${this.$v.formData.firstName.$params.maxLength.max} characters.`)
      !this.$v.formData.firstName.required && errors.push('First name field is required.')
      return errors
    },
    lastNameErrors () {
      const errors = []
      if (!this.$v.formData.lastName.$dirty) return errors
      !this.$v.formData.lastName.maxLength && errors.push(`Last name may not be greater
                    than ${this.$v.formData.lastName.$params.maxLength.max} characters.`)
      !this.$v.formData.lastName.required && errors.push('Last name field is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.formData.email.$dirty) return errors
      !this.$v.formData.email.checkEmailExists && errors.push('This email has already been taken.')
      !this.$v.formData.email.email && errors.push('Email must be a valid email address.')
      !this.$v.formData.email.required && errors.push('Email field is required.')
      return errors
    },
    usernameErrors () {
      const errors = []
      if (!this.$v.formData.username.$dirty) return errors
      !this.$v.formData.username.checkUsernameExists && errors.push('This username has already been taken.')
      !this.$v.formData.username.maxLength && errors.push(`Username may not be greater
                        than ${this.$v.formData.username.$params.maxLength.max} characters.`)
      !this.$v.formData.username.alphaNum && errors.push('Username may only contain letters and numbers.')
      !this.$v.formData.username.required && errors.push('Username field is required.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.formData.password.$dirty) return errors
      !this.$v.formData.password.passwordComplexity && errors.push(`Password must be at least 8 characters
                  and contain a lowercase character, uppercase character and a number.`)
      !this.$v.formData.password.required && errors.push('Password field is required.')
      return errors
    },
    repasswordErrors () {
      const errors = []
      if (!this.$v.formData.repassword.$dirty) return errors
      !this.$v.formData.repassword.sameAsPassword && errors.push('Re-password and password must match.')
      !this.$v.formData.repassword.required && errors.push('Re-password field is required.')
      return errors
    }
  },
  methods: {
    ...mapActions({
      signup: 'auth/signup'
    }),
    submitForm () {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      this.signup(this.formData)
        .then(res => {
          this.resetForm()
          this.$router.push({ name: 'feeds' })
        })
        .catch(error => console.log(error))
    },
    resetForm () {
      this.$v.$reset()
      this.formData.firstName = ''
      this.formData.lastName = ''
      this.formData.email = ''
      this.formData.username = ''
      this.formData.password = ''
      this.formData.repassword = ''
    }
  }
}
</script>

<style>

</style>
