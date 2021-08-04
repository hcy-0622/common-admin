<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <a href="/admin" @click="resetActivePath">首页</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row>
        <el-col :span="18">
          <el-form inline :model="query">
            <el-form-item label>
              <el-select v-model="query.role" placeholder="-所有角色-" clearable>
                <el-option label="管理员" value="manager"></el-option>
                <el-option label="普通用户" value="normal"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label>
              <el-select v-model="query.origin" placeholder="-所有来源-" clearable>
                <el-option label="本地注册" value="local"></el-option>
                <el-option label="Github登录" value="github"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label>
              <el-select v-model="query.type" placeholder="-所有用户-" clearable>
                <el-option label="用户名" value="username"></el-option>
                <el-option label="邮箱" value="email"></el-option>
                <el-option label="手机" value="phone"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label>
              <el-input v-model="query.keyword" placeholder="关键字" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="queryUsers">查询</el-button>
              <el-button type="primary" @click="exportQueryUsers">导出搜索结果</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="addUser">新增用户</el-button>
          <el-upload
            class="excel-uploader"
            :action="importAction"
            accept=".xls"
            :show-file-list="false"
            :before-upload="beforeUsersUpload"
            :on-success="importUsersSuccess"
            :on-error="importUsersError"
          >
            <el-button type="primary">导入用户</el-button>
          </el-upload>
          <a :href="exportHref">
            <el-button type="primary">导出所有用户</el-button>
          </a>
        </el-col>
      </el-row>
      <el-table :data="users.list" border stripe style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column label="角色" :formatter="getRoleNames"></el-table-column>
        <el-table-column label="状态">
          <template #default="{ row }">
            <el-switch
              v-model="row.userState"
              active-color="#13CE66"
              inactive-color="#FF4949"
              @change="changeUserState(row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" icon="el-icon-edit" @click="editUser(row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="deleteUser(row.id)"></el-button>
            <!-- <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" @click="distributeRoleClick(row)"></el-button>
            </el-tooltip>-->
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      :total="users.total"
      v-model:currentPage="query.page"
      v-model:pageSize="query.pageSize"
      :page-sizes="[5, 10, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>

    <user-form ref="userForm" :user="selectedUser" @succeed="formSucceed"></user-form>

    <!-- <el-dialog v-if="selectedUser" title="分配角色" :visible.sync="distributeRoleVisible" width="30%">
      <el-form ref="form" :model="selectedUser" label-width="80px">
        <el-form-item label="当前用户">
          <el-input v-model="selectedUser.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="当前角色">
          <el-input v-model="roleName" disabled></el-input>
        </el-form-item>
        <el-form-item label="新的角色">
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option v-for="r of roles" :key="r.id" :value="r.id" :label="r.roleName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="distributeRoleVisible = false">取消</el-button>
        <el-button type="danger" @click="removeRole">删除角色</el-button>
        <el-button type="primary" @click="distributeRole">新增角色</el-button>
      </span>
    </el-dialog>-->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

import UserForm from './UserForm.vue'
import useUsers from './useUsers';
import useExportUsers from './useExportUsers';
import userApi from '@/api/user';
import type { User } from '@/types/user';

const { users, query, getUsers } = useUsers()
const exportUsers = useExportUsers()
const selectedUser = ref<User>()
const userForm = ref()
const importAction = userApi.getImportUsers()
const exportHref = userApi.getExportUsers()

// 获取角色名称
const getRoleNames = (row: User) => row.roles.map(r => r.roleName).join(' | ')

// 查询用户数据
const queryUsers = () => {
  getUsers({ ...query, page: 1 })
}
// 导出用户数据
const exportQueryUsers = () => {
  exportUsers(users.list)
}

// 用户操作
const changeUserState = (row: User) => {
  userApi.updateUser(row.id, row).then(() => {
    ElMessage.success('用户状态更新成功')
  }).catch((e) => {
    row.userState = !row.userState
    ElMessage.error('用户状态更新失败')
  })
}
const addUser = () => {
  selectedUser.value = undefined
  userForm.value.show()
}
const editUser = (row: User) => {
  selectedUser.value = row
  userForm.value.show()
}
const formSucceed = () => {
  getUsers()
}
const deleteUser = (id: string) => {
  userApi.deleteUser(id).then(() => {
    getUsers()
  })
}

// 文件上传逻辑
const beforeUsersUpload = (file: File) => {
  const isExcel = file.type === 'application/vnd.ms-excel'
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isExcel) {
    ElMessage.error('只能导入Excel文件')
  }
  if (!isLt2M) {
    ElMessage.error('导入文件大小不能超过 2MB!')
  }
  return isExcel && isLt2M
}
const importUsersSuccess = () => {
  ElMessage.success('用户导入成功')
  getUsers()
}
const importUsersError = () => {
  ElMessage.success('用户导入失败')
}

const resetActivePath = () => {
  sessionStorage.removeItem('active_path')
}
</script>

<style scoped lang="scss">
.el-breadcrumb {
  padding-bottom: 20px;
}
.el-pagination {
  padding-top: 20px;
}
.excel-uploader {
  display: inline-block;
  margin: 0 20px;
}
</style>
