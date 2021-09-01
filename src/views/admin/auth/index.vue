<template>
  <el-form :model="query" class="flex">
    <el-form-item class="pr-4">
      <el-select v-model="query.type" placeholder="-权限类型-" clearable>
        <el-option label="菜单权限" value="menu"></el-option>
        <el-option label="路由权限" value="router"></el-option>
        <el-option label="请求权限" value="action"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-input v-model="query.keyword" placeholder="关键字" clearable></el-input>
    </el-form-item>
    <el-form-item class="px-4">
      <el-button type="primary" @click="queryAuths">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addAuth">新增</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="auths.list" border stripe>
    <el-table-column type="index"></el-table-column>
    <el-table-column prop="rightsName" label="权限名称"></el-table-column>
    <el-table-column prop="rightsDesc" label="权限描述"></el-table-column>
    <el-table-column label="权限等级">
      <template #default="{ row }">
        <el-tag v-if="row.level === 0" type="danger">一级</el-tag>
        <el-tag v-if="row.level === 1" type="warning">二级</el-tag>
        <el-tag v-if="row.level === 2" type="success">三级</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="状态">
      <template #default="{ row }">
        <el-switch
          v-model="row.rightsState"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="changeAuthState(row)"
        ></el-switch>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="primary" icon="el-icon-edit" @click="editAuth(row)"></el-button>
        <el-button type="danger" icon="el-icon-delete" @click="deleteAuth(row.id)"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    v-model:currentPage="query.page"
    v-model:pageSize="query.pageSize"
    :total="auths.total"
    :page-sizes="[5, 10, 15, 20]"
    layout="total, sizes, prev, pager, next, jumper"
    class="pt-4"
  ></el-pagination>

  <auth-form ref="authForm" :auth="selectedAuth" @succeed="formSucceed"></auth-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

import type { Auth } from '@/api/auth'
import authApi from '@/api/auth'
import useAuths from './useAuths'
import AuthForm from './AuthForm.vue'

const { auths, query, getAuths } = useAuths()
const selectedAuth = ref<Auth>()
const authForm = ref()

const queryAuths = () => {
  getAuths({ ...query, page: 1 })
}

const changeAuthState = (row: Auth) => {
  authApi
    .updateAuth(row.id, row)
    .then(() => {
      ElMessage.success('权限状态更新成功')
    })
    .catch(() => {
      row.rightsState = !row.rightsState
      ElMessage.error('权限状态更新失败')
    })
}
const addAuth = () => {
  selectedAuth.value = undefined
  authForm.value.show()
}
const editAuth = (row: Auth) => {
  selectedAuth.value = row
  authForm.value.show()
}
const deleteAuth = (id: number) => {
  authApi.deleteAuth(id).then(() => {
    ElMessage.success('权限删除成功')
    getAuths()
  })
}
const formSucceed = () => {
  getAuths()
}
</script>
