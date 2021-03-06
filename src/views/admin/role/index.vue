<template>
  <!--头部搜索区域-->
  <el-form :model="query" class="flex">
    <el-form-item>
      <el-input v-model="query.keyword" placeholder="关键字" clearable>
        <template #prefix>
          <i class="el-input__icon el-icon-search"></i>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="px-4">
      <el-button type="primary" @click="queryRoles">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addRole">添加</el-button>
    </el-form-item>
  </el-form>
  <!--中间表格区域-->
  <el-table :data="roles.list" border stripe>
    <el-table-column type="expand">
      <template #default="{ row }">
        <el-row v-for="item of row.rightsTree" :key="item.id">
          <el-col :span="6">
            <el-tag type="danger">{{ item.rightsName }}</el-tag>
          </el-col>
          <el-col :span="18">
            <el-row v-for="item2 of item.children" :key="item2.id">
              <el-col :span="6">
                <el-tag type="warning">{{ item2.rightsName }}</el-tag>
              </el-col>
              <el-col :span="18">
                <el-tag v-for="item3 of item2.children" :key="item3.id" type="success">{{ item3.rightsName }}</el-tag>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </template>
    </el-table-column>
    <el-table-column type="index"></el-table-column>
    <el-table-column prop="roleName" label="角色名称"></el-table-column>
    <el-table-column prop="roleDesc" label="角色备注"></el-table-column>
    <el-table-column label="状态">
      <template #default="{ row }">
        <el-switch
          v-model="row.roleState"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="changeRoleState(row)"
        ></el-switch>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="primary" icon="el-icon-edit" @click="editRole(row)"></el-button>
        <el-button type="danger" icon="el-icon-delete" @click="deleteRole(row.id)"></el-button>
        <el-tooltip effect="dark" content="分配权限" placement="top" :enterable="false">
          <el-button type="warning" icon="el-icon-setting" @click="distributeAuth(row)"></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    v-model:currentPage="query.page"
    v-model:pageSize="query.pageSize"
    :total="roles.total"
    :page-sizes="[5, 10, 15, 20]"
    layout="total, sizes, prev, pager, next, jumper"
    class="pt-4"
  ></el-pagination>

  <role-form ref="roleForm" :role="selectedRole" @succeed="formSucceed"></role-form>
  <distribute-auth-form ref="distributeForm" :role="selectedRole" @succeed="formSucceed"></distribute-auth-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

import type { Role } from '@/api/role'
import roleApi from '@/api/role'
import RoleForm from './RoleForm.vue'
import DistributeAuthForm from './DistributeAuthForm.vue'
import useRoles from './useRoles'

const { roles, query, getRoles } = useRoles()
const selectedRole = ref<Role>()
const roleForm = ref()
const distributeForm = ref()
const queryRoles = () => {
  getRoles({ ...query, page: 1 })
}
const changeRoleState = (row: Role) => {
  roleApi
    .updateRole(row.id, row)
    .then(() => {
      ElMessage.success('角色状态更新成功')
    })
    .catch(() => {
      row.roleState = !row.roleState
      ElMessage.error('角色状态更新失败')
    })
}
const distributeAuth = (row: Role) => {
  selectedRole.value = row
  distributeForm.value && distributeForm.value.show()
}
const addRole = () => {
  selectedRole.value = undefined
  roleForm.value.show()
}
const editRole = (row: Role) => {
  selectedRole.value = row
  roleForm.value.show()
}
const deleteRole = (id: number) => {
  roleApi.deleteRole(id).then(() => {
    ElMessage.success('角色删除成功')
    getRoles()
  })
}
const formSucceed = () => {
  getRoles()
}
</script>
