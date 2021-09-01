<template>
  <el-container class="w-screen h-screen overflow-hidden bg-gray-200">
    <el-header class="flex justify-between bg-blue-400">
      <div class="w-[200px] h-[60px]" @click="toggleCollapse">
        <img class="h-full" src="@/assets/logo.png" alt />
      </div>
      <div class="flex items-center">
        <img class="w-10 h10 rounded-[20px]" :src="userInfo.avatarURL || undefined" alt />
        <p class="pl-1 pr-4 text-gray-200 text-sm">{{ userInfo.username || userInfo.email || userInfo.phone }}</p>
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
          <el-submenu v-for="menu of menus" :key="menu.id" :index="menu.rightsPath">
            <template #title>
              <i class="el-icon-setting"></i>
              <span>{{ menu.rightsName }}</span>
            </template>
            <el-menu-item
              v-for="subMenu of menu.children"
              :key="subMenu.id"
              :index="subMenu.rightsPath"
              @click="menuItemClick(subMenu.rightsPath)"
            >
              <i class="el-icon-setting"></i>
              <span>{{ subMenu.rightsName }}</span>
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
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

import type { User } from '@/api/user'

const router = useRouter()
const defaultActivePath = ref('')
const isCollapsed = ref(false)
const menus = computed(() => userInfo.rightTree?.find((r) => r.rightsType === 'menu').children)
let userInfo: Partial<User> = {}
const info = sessionStorage.getItem('user_info')
if (info) userInfo = JSON.parse(info)

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
  sessionStorage.removeItem('active_path')
  sessionStorage.removeItem('user_info')
  router.push('/login')
}

const resetActivePath = () => {
  sessionStorage.removeItem('active_path')
}
</script>
