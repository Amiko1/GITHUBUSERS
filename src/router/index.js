import { createRouter, createWebHistory } from 'vue-router'

import users from '../views/Users.vue'
import repos from '../views/Repos.vue'
const routes = [

  {
    path: '/', redirect: { name: 'users' }
  },

  {
    path: '/users',
    name: 'users',
    component: users
  },
  {
    path: '/users/:username/repos',

    name: 'repos',
    component: repos
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
