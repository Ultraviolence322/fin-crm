import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { auth: true },
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty', auth: false },
    component: () => import('../pages/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty', auth: false },
    component: () => import('../pages/Register.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: { auth: true },
    component: () => import('../pages/Categories.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail-record',
    meta: { auth: true },
    component: () => import('../pages/DetailRecord.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: { auth: true },
    component: () => import('../pages/History.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: { auth: true },
    component: () => import('../pages/Planning.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { auth: true },
    component: () => import('../pages/Profile.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: { auth: true },
    component: () => import('../pages/Record.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let user
  if (firebase.auth().currentUser) {
    user = firebase.auth().currentUser.emailVerified
  } else {
    user = firebase.auth().currentUser
  }
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (!user && requireAuth) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
