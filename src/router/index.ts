import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Register from '../views/register/index.vue'
import Login from '../views/login/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router
