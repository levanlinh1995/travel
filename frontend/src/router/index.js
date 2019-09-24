import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

// import component
import LoginPage from '../components/auth/LoginPage'
import HomePage from '../components/views/home/Home'
import Feeds from '../components/modules/feeds/FeedHome'
import UserHome from '../components/modules/users/UserHome'
import UserPostList from '../components/modules/users/posts/PostList'

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
    component: HomePage,
    name: 'home',
    beforeEnter: redirectToFeedsPageIfLoggedIn
  },
  {
    path: '/auth/login',
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
  },
  {
    path: '/user/:username',
    component: UserHome,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        component: UserPostList,
        name: 'user-post-list'
      }
    ]
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
