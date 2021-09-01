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
  {
    path: '/',
    redirect: '/admin',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') {
    return next()
  }
  const token = Cookies.get('token')
  if (!token) {
    return next('/login')
  }
  const routerRights = getRouterRights()
  const flag = isNext(routerRights, to.path)
  if (flag) next()
  else next(false)
})

const isNext = (rights: any, path: string) => {
  if (rights.rightsPath === path) return true
  if (rights.children) {
    for (let i = 0; i < rights.children.length; i++) {
      const item = rights.children[i]
      if (isNext(item, path)) return true
    }
  }
  return false
}
const getRouterRights = () => {
  const data = sessionStorage.getItem('user_info')
  if (!data) return null
  const userInfo = JSON.parse(data)
  const routerRights = userInfo.rightTree.find((r: any) => r.rightsType === 'router')
  return routerRights
}

export default router
