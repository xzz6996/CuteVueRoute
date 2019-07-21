import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)
export const staticRouters=[
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    component: Home,
    children:[
      {
        path: '/home',
        component: () => import('@/views/Home'),
        meta: { title: 'home', icon: 'home', }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( './views/Login.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import( './views/404.vue')
  }
]
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: staticRouters
})
