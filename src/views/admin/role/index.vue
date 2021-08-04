<template>
  <!--头部搜索区域-->
  <el-form :model="query" class="form-inline">
    <el-form-item style="flex: auto;">
      <el-input v-model="query.keyword" placeholder="关键字" clearable>
        <template #prefix>
          <i class="el-input__icon el-icon-search"></i>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item style="padding: 0 20px;">
      <el-button type="primary" @click="queryRoles">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addRole">添加</el-button>
    </el-form-item>
  </el-form>
  <!--中间表格区域-->
  <el-table :data="roles.list" style="width: 100%" :border="true" :stripe="true">
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
        <!-- <el-button type="warning" icon="el-icon-setting"></el-button> -->
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    style="padding-top: 20px;"
    :total="roles.total"
    v-model:currentPage="query.page"
    v-model:pageSize="query.pageSize"
    :page-sizes="[5, 10, 15, 20]"
    layout="total, sizes, prev, pager, next, jumper"
  ></el-pagination>

  <role-form ref="roleForm" :role="selectedRole" @succeed="formSucceed"></role-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus';

import RoleForm from './RoleForm.vue'
import useRoles from "./useRoles";
import type { Role } from "@/types/role"
import roleApi from '@/api/role';


const { roles, query, getRoles } = useRoles()
const selectedRole = ref<Role>()
const roleForm = ref()
const queryRoles = () => {
  getRoles({ ...query, page: 1 })
}
const changeRoleState = (row: Role) => {
  roleApi.updateRole(row.id, row).then(() => {
    ElMessage.success('角色状态更新成功')
  }).catch((e) => {
    row.roleState = !row.roleState
    ElMessage.error('角色状态更新失败')
  })
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
  roleApi.delRole(id).then(() => {
    getRoles()
  })
}
const formSucceed = () => { getRoles() }
</script>

<style scoped lang="scss">
.form-inline {
  display: flex;
  justify-content: center;
}
</style>
