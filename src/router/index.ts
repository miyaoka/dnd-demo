import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import List from '@/views/List.vue'
import List2 from '@/views/List2.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/list',
    name: 'list',
    component: List
  },
  {
    path: '/list2',
    name: 'list2',
    component: List2
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
