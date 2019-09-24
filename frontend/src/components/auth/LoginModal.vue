<template>
    <v-dialog v-model="dialogStatus" max-width="500px">
        <v-tabs
          v-model="tabStatus"
          class="elevation-2"
          grow
        >
          <v-tab
            :key="'login'"
            :href="'#tab-login'"
          >
            Login
          </v-tab>
          <v-tab
            :key="'signup'"
            :href="'#tab-signup'"
          >
            Sign up
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tabStatus">
          <v-tab-item
            :key="'login'"
            :value="'tab-login'"
          >
            <v-card
              flat
              tile
            >
              <v-card-title class="headline justify-center primary--text font-weight-medium">Login to Phượt</v-card-title>
              <v-card-text>
                <v-container>
                  <div v-if="loginErrors.length > 0" class="red--text mb-3">
                    {{ loginErrors[0] }}
                  </div>
                  <v-form
                  >
                    <v-text-field
                      v-model="loginFormData.email"
                      label="Email"
                      required
                      outlined
                      append-icon="fa-envelope"
                      :error-messages="LoginEmailErrors"
                      @input="$v.loginFormData.email.$touch()"
                      @blur="$v.loginFormData.email.$touch()"
                    ></v-text-field>

                    <v-text-field
                      v-model="loginFormData.password"
                      label="Password"
                      type="password"
                      required
                      outlined
                      append-icon="fa-lock"
                      :error-messages="LoginPasswordErrors"
                      @input="$v.loginFormData.password.$touch()"
                      @blur="$v.loginFormData.password.$touch()"
                    ></v-text-field>

                    <div class="text-center">
                      <v-btn
                        class="mr-2"
                        color="primary"
                        @click="submitLogin"
                      >
                        Login
                      </v-btn>
                      <v-btn
                        @click="closeModal"
                      >
                        Cancel
                      </v-btn>
                    </div>
                  </v-form>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item
            :key="'signup'"
            :value="'tab-signup'"
          >
            <v-card
              flat
              tile
            >
              <v-card-title class="headline justify-center primary--text font-weight-medium">Create a new account</v-card-title>
              <v-card-text>
                <v-container>
                  <v-form
                  >
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          v-model="signupFormData.firstName"
                          label="First name"
                          required
                          outlined
                          :error-messages="signupFirstNameErrors"
                          @input="$v.signupFormData.firstName.$touch()"
                          @blur="$v.signupFormData.firstName.$touch()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="signupFormData.lastName"
                          label="Last name"
                          required
                          outlined
                          :error-messages="signupLastNameErrors"
                          @input="$v.signupFormData.lastName.$touch()"
                          @blur="$v.signupFormData.lastName.$touch()"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-text-field
                      v-model.lazy="signupFormData.email"
                      label="Email"
                      required
                      outlined
                      append-icon="fa-envelope"
                      :error-messages="signupEmailErrors"
                      @input="$v.signupFormData.email.$reset()"
                      @blur="$v.signupFormData.email.$touch()"
                    ></v-text-field>
                    <v-text-field
                      v-model.lazy="signupFormData.username"
                      label="Username"
                      required
                      outlined
                      append-icon="fa-user"
                      :error-messages="signupUsernameErrors"
                      @input="$v.signupFormData.username.$reset()"
                      @blur="$v.signupFormData.username.$touch()"
                    ></v-text-field>

                    <v-text-field
                      v-model="signupFormData.password"
                      label="Password"
                      type="password"
                      required
                      outlined
                      append-icon="fa-lock"
                      :error-messages="signupPasswordErrors"
                      @input="$v.signupFormData.password.$touch()"
                      @blur="$v.signupFormData.password.$touch()"
                    ></v-text-field>

                    <v-text-field
                      v-model="signupFormData.repassword"
                      label="Re-password"
                      type="password"
                      required
                      outlined
                      append-icon="fa-lock"
                      :error-messages="signupRepasswordErrors"
                      @input="$v.signupFormData.repassword.$touch()"
                      @blur="$v.signupFormData.repassword.$touch()"
                    ></v-text-field>

                    <div class="text-center">
                      <v-btn
                        class="mr-2"
                        color="primary"
                        @click="submitSignup"
                      >
                        Signup
                      </v-btn>
                      <v-btn
                        @click="closeModal"
                      >
                        Cancel
                      </v-btn>
                    </div>
                  </v-form>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { required, maxLength, email, sameAs, alphaNum } from 'vuelidate/lib/validators'
import passwordComplexity from '../../plugins/vuevalidate/customValidators/passwordComplexity'

export default {
  model: {
    prop: 'dialog',
    event: 'change'
  },
  props: {
    dialog: Boolean,
    tab: {
      type: String,
      default: 'tab-login'
    }
  },
  data () {
    return {
      loginErrors: [],
      loginFormData: {
        email: '',
        password: ''
      },
      signupFormData: {
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
    loginFormData: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    },
    signupFormData: {
      firstName: {
        required,
        maxLength: maxLength(50)
      },
      lastName: {
        required,
        maxLength: maxLength(50)
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
    dialogStatus: {
      get: function () {
        return this.dialog
      },
      set: function (newValue) {
        this.$emit('change', newValue)
      }
    },
    tabStatus: {
      get: function () {
        return this.tab
      },
      set: function (newValue) {
        this.$emit('update:tab', newValue)
      }
    },
    LoginEmailErrors () {
      const errors = []
      if (!this.$v.loginFormData.email.$dirty) return errors
      !this.$v.loginFormData.email.email && errors.push('Email must be a valid email address.')
      !this.$v.loginFormData.email.required && errors.push('Email field is required.')
      return errors
    },
    LoginPasswordErrors () {
      const errors = []
      if (!this.$v.loginFormData.password.$dirty) return errors
      !this.$v.loginFormData.password.required && errors.push('Password field is required.')
      return errors
    },
    signupFirstNameErrors () {
      const errors = []
      if (!this.$v.signupFormData.firstName.$dirty) return errors
      !this.$v.signupFormData.firstName.maxLength && errors.push(`First name may not be greater
                  than ${this.$v.signupFormData.firstName.$params.maxLength.max} characters.`)
      !this.$v.signupFormData.firstName.required && errors.push('First name field is required.')
      return errors
    },
    signupLastNameErrors () {
      const errors = []
      if (!this.$v.signupFormData.lastName.$dirty) return errors
      !this.$v.signupFormData.lastName.maxLength && errors.push(`Last name may not be greater
                    than ${this.$v.signupFormData.lastName.$params.maxLength.max} characters.`)
      !this.$v.signupFormData.lastName.required && errors.push('Last name field is required.')
      return errors
    },
    signupEmailErrors () {
      const errors = []
      if (!this.$v.signupFormData.email.$dirty) return errors
      !this.$v.signupFormData.email.checkEmailExists && errors.push('This email has already been taken.')
      !this.$v.signupFormData.email.email && errors.push('Email must be a valid email address.')
      !this.$v.signupFormData.email.required && errors.push('Email field is required.')
      return errors
    },
    signupUsernameErrors () {
      const errors = []
      if (!this.$v.signupFormData.username.$dirty) return errors
      !this.$v.signupFormData.username.checkUsernameExists && errors.push('This username has already been taken.')
      !this.$v.signupFormData.username.maxLength && errors.push(`Username may not be greater
                    than ${this.$v.signupFormData.username.$params.maxLength.max} characters.`)
      !this.$v.signupFormData.username.alphaNum && errors.push('Username may only contain letters and numbers.')
      !this.$v.signupFormData.username.required && errors.push('Username field is required.')
      return errors
    },
    signupPasswordErrors () {
      const errors = []
      if (!this.$v.signupFormData.password.$dirty) return errors
      !this.$v.signupFormData.password.passwordComplexity && errors.push(`Password must be at least 8 characters 
                and contain a lowercase character, uppercase character and a number.`)
      !this.$v.signupFormData.password.required && errors.push('Password field is required.')
      return errors
    },
    signupRepasswordErrors () {
      const errors = []
      if (!this.$v.signupFormData.repassword.$dirty) return errors
      !this.$v.signupFormData.repassword.sameAsPassword && errors.push('Re-password and password must match.')
      !this.$v.signupFormData.repassword.required && errors.push('Re-password field is required.')
      return errors
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    ...mapActions({
      signup: 'auth/signup'
    }),
    closeModal () {
      this.$emit('change', false)
    },
    submitLogin () {
      this.$v.loginFormData.$touch()

      if (this.$v.loginFormData.$invalid) {
        return
      }

      this.login(this.loginFormData)
        .then(res => {
          this.resetLoginForm()
          this.closeModal()
          this.$router.push({ name: 'feeds' })
        })
        .catch(error => {
          this.loginErrors.push('Email or password is incorrect.')
          console.log(error)
        })
    },
    submitSignup () {
      this.$v.signupFormData.$touch()

      if (this.$v.signupFormData.$invalid) {
        return
      }

      this.signup(this.signupFormData)
        .then(res => {
          this.resetSignupForm()
          this.closeModal()
          this.$router.push({ name: 'feeds' })
        })
        .catch(error => console.log(error))
    },
    resetSignupForm () {
      this.$v.signupFormData.$reset()
      this.signupFormData.firstName = ''
      this.signupFormData.lastName = ''
      this.signupFormData.email = ''
      this.signupFormData.username = ''
      this.signupFormData.password = ''
      this.signupFormData.repassword = ''
    },
    resetLoginForm () {
      this.$v.loginFormData.$reset()
      this.loginErrors = []
      this.loginFormData.email = ''
      this.loginFormData.password = ''
    }
  }
}
</script>
