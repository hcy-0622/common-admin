import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Cookies from 'js-cookie'

import Register from '../views/register/index.vue'
import Login from '../views/login/index.vue'
import Admin from '../views/admin/index.vue'
import Welcome from '../views/admin/welcome/index.vue'
import User from '../views/admin/user/index.vue'
import Role from '../views/admin/role/index.vue'
import Auth from '../views/admin/auth/index.vue'

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
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome,
      },
      {
        path: '/user',
        component: User,
      },
      {
        path: '/role',
        component: Role,
      },
      {
        path: '/auth',
        component: Auth,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') {
    return next()
  }
  const token = Cookies.get('token')
  if (!token) {
    return next('/login')
  }
  next()
})

export default router
