import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

// lazy load component
const LoginPage = () => import('../components/auth/LoginPage')
const HomePage = () => import('../components/views/home/Home')
const Feeds = () => import('../components/modules/feeds/FeedHome')
const UserHome = () => import('../components/modules/users/UserHome')
const UserTimelineHome = () => import('../components/modules/users/timeline/TimelineHome')
const UserAboutHome = () => import('../components/modules/users/about/AboutHome')
const UserFriendsHome = () => import('../components/modules/users/friends/FriendsHome')
const UserPhotosHome = () => import('../components/modules/users/photos/PhotosHome')
const JourneyStoryHome = () => import('../components/modules/stories/StoryHome')
const StoryList = () => import('../components/modules/stories/StoryList')

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
  },
  {
    path: '/journey-story',
    component: JourneyStoryHome,
    children: [
      {
        path: '',
        component: StoryList,
        name: 'story-list'
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
