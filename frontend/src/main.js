import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import i18n from './i18n/i18n'
import axios from './axios/index'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(Vuelidate)

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
