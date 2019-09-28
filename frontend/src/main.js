import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import vuetify from './plugins/vuetify'
import i18n from './i18n/i18n'
import axios from './axios/index'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'
import '@babel/polyfill'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(Vuelidate)
Vue.use(require('vue-moment'))

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
