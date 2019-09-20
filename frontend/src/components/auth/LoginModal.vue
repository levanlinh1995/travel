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
                  <v-form
                  >
                    <v-text-field
                      v-model="formData.email"
                      label="Email"
                      required
                      outlined
                      append-icon="fa-user"
                    ></v-text-field>

                    <v-text-field
                      v-model="formData.password"
                      label="Password"
                      type="password"
                      required
                      outlined
                      append-icon="fa-lock"
                    ></v-text-field>

                    <div class="text-center">
                      <v-btn
                        class="mr-2"
                        color="primary"
                        type="submit"
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
              <v-card-title class="headline justify-center primary--text font-weight-medium">Sign up a account</v-card-title>
              <v-card-text>
                <v-container>
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
                      append-icon="fa-envelope"
                    ></v-text-field>

                    <v-text-field
                      v-model="formData.password"
                      label="Password"
                      type="password"
                      required
                      outlined
                      append-icon="fa-lock"
                    ></v-text-field>

                    <v-text-field
                      v-model="formData.repassword"
                      label="Re-password"
                      type="password"
                      required
                      outlined
                      append-icon="fa-lock"
                    ></v-text-field>

                    <div class="text-center">
                      <v-btn
                        class="mr-2"
                        color="primary"
                        type="submit"
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
    }
  },
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
  methods: {
    closeModal () {
      this.$emit('change', false)
    }
  }
}
</script>
