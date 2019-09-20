import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

// import component
import LoginPage from '../components/auth/LoginPage'
import Home from '../components/views/home/Home'
import Feeds from '../components/modules/feeds/Feed'

Vue.use(Router)

let redirectToFeedsPageIfLoggedIn = (to, from, next) => {
  if (store.getters['auth/isAuthenticated']) {
    next({ name: 'feeds' })
  }

  next()
}

const routes = [
  {
    path: '',
    component: Home,
    name: '/home',
    beforeEnter: redirectToFeedsPageIfLoggedIn
  },
  {
    path: '/login',
    component: LoginPage,
    name: 'login',
    beforeEnter: redirectToFeedsPageIfLoggedIn
  },
  {
    path: '/feeds',
    component: Feeds,
    name: 'feeds',
    meta: {
      requiresAuth: true
    }
  }
]

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['auth/isAuthenticated']) {
      next()
      return
    }
    next({ name: 'login' })
  }

  next()
})

export default router
