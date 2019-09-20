<template>
  <div>
    <v-row align="center" justify="center" class="mb-5">
        <h2 class="display-2">Create new account</h2>
      </v-row>
      <v-row align="center" justify="center">
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
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { required, minLength, maxLength, email, sameAs } from 'vuelidate/lib/validators'

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
  },
  validations: {
    formData: {
      firstName: {
        required,
        maxLength: maxLength(20)
      },
      lastName: {
        required,
        maxLength: maxLength(20)
      },
      email: {
        required,
        email,
        isUnique (value) {
          if (value === '') return true

          return new Promise((resolve, reject) => {
            this.checkEmailExists(value)
              .then(res => {
                resolve(res.data.data.email !== 'exist')
              })
          })
        }
      },
      password: {
        required,
        minLength: minLength(6)
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
      !this.$v.formData.firstName.maxLength && errors.push(`First name field must have at most ${this.$v.formData.firstName.$params.maxLength.max} letters`)
      !this.$v.formData.firstName.required && errors.push('First name field is required')
      return errors
    },
    lastNameErrors () {
      const errors = []
      if (!this.$v.formData.lastName.$dirty) return errors
      !this.$v.formData.lastName.maxLength && errors.push(`Last name field must have at most ${this.$v.formData.lastName.$params.maxLength.max} letters`)
      !this.$v.formData.lastName.required && errors.push('Last name field is required')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.formData.email.$dirty) return errors
      !this.$v.formData.email.isUnique && errors.push('This email is already registered')
      !this.$v.formData.email.email && errors.push('Must be valid e-mail')
      !this.$v.formData.email.required && errors.push('Email field is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.formData.password.$dirty) return errors
      !this.$v.formData.password.minLength && errors.push(`Password field must have at least ${this.$v.formData.password.$params.minLength.min} letters`)
      !this.$v.formData.password.required && errors.push('Password field is required')
      return errors
    },
    repasswordErrors () {
      const errors = []
      if (!this.$v.formData.repassword.$dirty) return errors
      !this.$v.formData.repassword.sameAsPassword && errors.push('Passwords must be identical')
      !this.$v.formData.repassword.required && errors.push('Re-password field is required')
      return errors
    }
  },
  methods: {
    ...mapActions({
      signup: 'auth/signup',
      checkEmailExists: 'auth/checkEmailExists'
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
      this.formData.password = ''
      this.formData.repassword = ''
    }
  }
}
</script>

<style>

</style>
