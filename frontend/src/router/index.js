import Vue from 'vue'
import Router from 'vue-router'

// import component
import Home from '../components/home/Home'

Vue.use(Router)

const routes = [
  {
    path: '', component: Home, name: 'home'
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
