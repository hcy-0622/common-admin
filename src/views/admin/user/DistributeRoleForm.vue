<template>
  <el-dialog v-model="visible" title="分配角色" destroy-on-close>
    <el-form ref="form" :model="formData" :rules="formRules" label-width="80px">
      <el-form-item label="当前用户">
        <el-input v-model="formData.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="当前角色">
        <el-input v-model="roleNames" placeholder="请分配角色" disabled></el-input>
      </el-form-item>
      <el-form-item label="新的角色" prop="roleId">
        <el-select v-model="formData.roleId" placeholder="请选择">
          <el-option v-for="r of roles" :key="r.id" :value="r.id" :label="r.roleName"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="danger" @click="removeRole">删除角色</el-button>
      <el-button type="primary" @click="distributeRole">新增角色</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, toRef, computed, onMounted } from 'vue'
import type { User } from '@/types/user'
import type { Role } from '@/types/role'
import roleApi from '@/api/role'
import { ElMessage } from 'element-plus'

interface Props {
  user?: User
}

const props = defineProps<Props>()
const emit = defineEmits(['succeed', 'failed'])
const user = toRef(props, 'user')
const visible = ref(false)
const roles = ref<Role[]>([])
const form = ref()
const formData = ref<Partial<User & { roleId: number }>>({})
const formRules = {
  roleId: [{ required: true, message: '请选择角色', trigger: 'change' }],
}
const roleNames = computed(() => (formData.value.roles ? formData.value.roles.map((r) => r.roleName).join(' | ') : ''))

watch(user, () => {
  if (user.value) {
    formData.value = { ...user.value }
  } else {
    formData.value = {}
  }
})
onMounted(() => {
  roleApi.getRoles({}).then((result) => {
    roles.value = result.data
    close()
    emit('succeed')
  })
})
const distributeRole = () => {
  form.value.validate((flag: boolean) => {
    if (!flag || !user.value) return
    roleApi
      .createUserRole({
        userId: user.value.id,
        roleId: formData.value.roleId as number,
      })
      .then(() => {
        ElMessage.success('角色分配成功')
        close()
        emit('succeed')
      })
  })
}
const removeRole = () => {
  form.value.validate((flag: boolean) => {
    if (!flag || !user.value) return
    roleApi
      .deleteUserRole(user.value.id, {
        userId: user.value.id,
        roleId: formData.value.roleId as number,
      })
      .then(() => {
        ElMessage.success('角色移除成功')
        close()
        emit('succeed')
      })
  })
}
const show = () => {
  visible.value = true
}
const close = () => {
  visible.value = false
}
defineExpose({ show, close })
</script>
