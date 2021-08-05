<template>
  <el-container class="w-screen h-screen overflow-hidden bg-gray-200">
    <el-header class="flex justify-between bg-blue-400">
      <div class="w-[200px] h-[60px]" @click="toggleCollapse">
        <img class="h-full" src="@/assets/logo.png" alt />
      </div>
      <div class="flex items-center">
        <img class="w-10 h10 rounded-[20px]" src="../../assets/avatar.jpg" alt />
        <p class="pl-1 pr-4 text-gray-200 text-sm">只是个传说</p>
        <el-button type="danger" size="mini" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container class="overflow-auto">
      <el-aside class="bg-white" :width="isCollapsed ? '64px' : '200px'">
        <el-menu
          :router="true"
          :default-active="defaultActivePath"
          :collapse="isCollapsed"
          :collapse-transition="false"
          background-color="#fff"
          text-color="#666"
          active-text-color="deepskyblue"
        >
          <el-submenu v-for="menu of menus" :key="menu.label" :index="menu.label">
            <template #title>
              <i :class="menu.icon"></i>
              <span>{{ menu.label }}</span>
            </template>
            <el-menu-item
              v-for="subMenu of menu.children"
              :key="subMenu.label"
              :index="subMenu.path"
              @click="menuItemClick(subMenu.path)"
            >
              <i :class="subMenu.icon"></i>
              <span>{{ subMenu.label }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb class="mb-4" separator="/">
          <el-breadcrumb-item>
            <a href="/admin" @click="resetActivePath">首页</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import useMenus from './useMenus'

const router = useRouter()
const defaultActivePath = ref('')
const isCollapsed = ref(false)
const menus = useMenus()

const path = sessionStorage.getItem('active_path') || ''
defaultActivePath.value = path

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const menuItemClick = (path: string) => {
  defaultActivePath.value = path
  sessionStorage.setItem('active_path', path)
}

const logout = () => {
  Cookies.remove('token')
  router.push('/login')
}

const resetActivePath = () => {
  sessionStorage.removeItem('active_path')
}
</script>
