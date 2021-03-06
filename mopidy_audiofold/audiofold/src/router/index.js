import Vue from 'vue'
import VueRouter from 'vue-router'

import Queue from '../views/Queue'
import Playback from '../views/Playback'
import Search from '../views/Search'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Playback',
    component: Playback
  },
  {
    path: '/queue',
    name: 'Queue',
    component: Queue
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
