<template>
  <el-dialog v-model="visible" :title="title" destroy-on-close>
    <el-form ref="form" :model="formData" :rules="formRules" label-width="80px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="formData.roleName" prefix-icon="el-icon-user" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="formData.roleDesc" prefix-icon="el-icon-info" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue'
import roleApi from '@/api/role'
import type { Role } from '@/api/role'

interface Props {
  role: Role
}

const props = defineProps<Props>()
const emit = defineEmits(['succeed', 'failed'])
const { role } = toRefs(props)
const visible = ref(false)
const title = computed(() => (role.value ? '编辑' : '新增') + '角色')
const form = ref()
const formData = ref<Partial<Role>>({})
const formRules = {
  roleName: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
    { min: 2, message: '长度至少2个字符', trigger: 'blur' },
  ],
}

const show = () => {
  visible.value = true
}
const close = () => {
  form.value.resetField()
  visible.value = false
}
const submit = () => {
  if (!form.value) return
  form.value.validate(async (flag: boolean) => {
    if (!flag) {
      return
    }
    try {
      if (role.value) {
        await roleApi.updateRole(role.value.id, formData.value as Role)
      } else {
        await roleApi.createRole(formData.value as Role)
      }
      close()
      emit('succeed')
    } catch (e) {
      emit('failed')
    }
  })
}

watch(role, () => {
  if (role.value) {
    formData.value = { ...role.value }
  } else {
    formData.value = {}
  }
})

defineExpose({ show, close })
</script>
