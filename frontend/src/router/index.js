import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

// import component
import LoginPage from '../components/auth/LoginPage'
import HomePage from '../components/views/home/Home'
import Feeds from '../components/modules/feeds/FeedHome'
import UserHome from '../components/modules/users/UserHome'
import UserTimelineHome from '../components/modules/users/timeline/TimelineHome'
import UserAboutHome from '../components/modules/users/about/AboutHome'
import UserFriendsHome from '../components/modules/users/friends/FriendsHome'
import UserPhotosHome from '../components/modules/users/photos/PhotosHome'

Vue.use(Router)

let redirectToFeedsPageIfLoggedIn = (to, from, next) => {
  if (store.getters['auth/isAuthenticated']) {
    next({ name: 'feeds' })
    return
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
        component: UserTimelineHome,
        name: 'user-timeline-home'
      },
      {
        path: 'about',
        component: UserAboutHome,
        name: 'user-about-home'
      },
      {
        path: 'friends',
        component: UserFriendsHome,
        name: 'user-friends-home'
      },
      {
        path: 'photos',
        component: UserPhotosHome,
        name: 'user-photos-home'
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
    } else {
      next({ name: 'login' })
      return
    }
  }

  next()
})

export default router
