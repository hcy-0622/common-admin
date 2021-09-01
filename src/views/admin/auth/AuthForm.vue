<template>
  <el-dialog v-model="visible" :title="title" destroy-on-close>
    <el-form ref="form" :model="formData" :rules="formRules" label-width="80px">
      <el-form-item label="权限名称" prop="rightsName">
        <el-input v-model="formData.rightsName" prefix-icon="el-icon-user" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="权限描述" prop="rightsDesc">
        <el-input v-model="formData.rightsDesc" prefix-icon="el-icon-info" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="权限类型" prop="rightsType">
        <el-select v-model="formData.rightsType">
          <el-option label="菜单权限" value="menu"></el-option>
          <el-option label="路由权限" value="router"></el-option>
          <el-option label="请求权限" value="action"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="formData.rightsType === 'action'" label="请求方式" prop="rightsMethod">
        <el-select v-model="formData.rightsMethod">
          <el-option label="GET请求" value="get"></el-option>
          <el-option label="POST请求" value="post"></el-option>
          <el-option label="PUT请求" value="put"></el-option>
          <el-option label="DELETE请求" value="delete"></el-option>
          <el-option label="所有请求" value="all"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限等级" prop="level">
        <el-select v-model="formData.level">
          <el-option label="一级权限" :value="0"></el-option>
          <el-option label="二级权限" :value="1"></el-option>
          <el-option label="三级权限" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="formData.level" label="上级权限" prop="pid">
        <el-select v-model="formData.pid">
          <el-option v-for="a of parentAuths" :key="a.id" :value="a.id" :label="a.rightsName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限地址" prop="rightsPath">
        <el-input v-model="formData.rightsPath" prefix-icon="el-icon-info" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref, toRefs, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'

import type { Auth } from '@/api/auth'
import authApi from '@/api/auth'

interface Props {
  auth: Auth
}
interface FormProps {
  formData: Partial<Auth>
  parentAuths: Auth[]
  visible: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['succeed', 'failed'])
const form = ref()
const state = reactive<FormProps>({ formData: {}, parentAuths: [], visible: false })
const { formData, parentAuths, visible } = toRefs(state)
const title = computed(() => (props.auth ? '编辑' : '新增') + '权限')
const formRules = computed(() => {
  const validatePid = (rule: any, value: number, callback: any) => {
    if (formData.value.level !== 0 && !value) {
      callback('非一级权限必须选择上级权限')
    } else {
      callback()
    }
  }
  const validateMethod = (rule: any, value: string, callback: any) => {
    if (formData.value.rightsType === 'action' && !value) {
      callback('请求权限必须选择请求方式')
    } else {
      callback()
    }
  }

  return {
    rightsName: [
      { required: true, message: '请输入权限名称', trigger: 'blur' },
      { min: 1, message: '长度至少1个字符', trigger: 'blur' },
    ],
    rightsDesc: [
      { required: true, message: '请输入权限描述', trigger: 'blur' },
      { min: 1, message: '长度至少1个字符', trigger: 'blur' },
    ],
    rightsType: [{ required: true, message: '请选择权限类型', trigger: 'change' }],
    rightsMethod: [{ validator: validateMethod, trigger: 'change' }],
    rightsPath: [{ required: false, message: '请输入权限地址', trigger: 'blur' }],
    pid: [{ validator: validatePid, trigger: 'change' }],
    level: [{ required: false, message: '请选择权限等级', trigger: 'change' }],
  }
})

watch(
  () => props.auth,
  (auth) => {
    if (auth) {
      formData.value = { ...auth }
    } else {
      formData.value = {}
    }
  },
  { deep: true }
)
watch(
  () => formData.value.level,
  (level) => {
    if (level) {
      authApi
        .getAuths({
          rightsType: formData.value.rightsType,
          level: level - 1,
        })
        .then((result) => {
          parentAuths.value = result.data
        })
        .catch(() => {
          parentAuths.value = []
        })
    } else {
      parentAuths.value = []
    }
  }
)

const show = () => {
  visible.value = true
}
const close = () => {
  if (form.value && form.value.resetField) form.value.resetField()
  visible.value = false
}
const submit = () => {
  if (!form.value) return
  form.value.validate(async (flag: boolean) => {
    if (!flag) return
    try {
      if (props.auth) {
        await authApi.updateAuth(props.auth.id, formData.value as Auth)
        ElMessage.success('权限编辑成功')
      } else {
        await authApi.createAuth(formData.value as Auth)
        ElMessage.success('权限添加成功')
      }
      close()
      emit('succeed')
    } catch (e) {
      emit('failed')
    }
  })
}

defineExpose({ show, close })
</script>
