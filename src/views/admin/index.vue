<template>
  <el-container>
    <el-header>
      <div class="header-left" @click="toggleCollapse">
        <img src="@/assets/logo.png" alt />
      </div>
      <div class="header-right">
        <img src="../../assets/avatar.jpg" alt />
        <p>只是个传说</p>
        <el-button @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="isCollapsed ? '64px' : '200px'">
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
        <el-breadcrumb separator="/">
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

<style scoped lang="scss">
.el-container {
  width: 100vw;
  height: 100vh;
  background: #ccc;
  overflow: hidden;
  .el-header {
    display: flex;
    justify-content: space-between;
    background: #7c3aed;
    .header-left {
      width: 200px;
      height: 60px;
      img {
        height: 100%;
      }
    }
    .header-right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
      }
      p {
        padding-left: 10px;
        padding-right: 20px;
      }
    }
  }
  .el-aside {
    background: #fff;
  }
}
.el-breadcrumb {
  padding-bottom: 20px;
}
</style>
