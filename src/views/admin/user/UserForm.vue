<template>
  <el-dialog v-model="visible" :title="title" destroy-on-close>
    <el-form ref="form" :model="formData" :rules="formRules">
      <el-form-item style="text-align: center">
        <el-upload
          class="avatar-uploader"
          :action="uploadAvatarAction"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-success="avatarUploadSuccess"
          :on-error="avatarUploadError"
        >
          <img v-if="formData.avatarURL" :src="formData.avatarURL" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="formData.username" prefix-icon="el-icon-user" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="formData.email" prefix-icon="el-icon-message" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input v-model="formData.phone" prefix-icon="el-icon-phone-outline" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="formData.password"
          type="password"
          prefix-icon="el-icon-lock"
          placeholder="密码"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref, toRefs, watchEffect } from 'vue'
import { ElMessage } from 'element-plus'
import userApi from '@/api/user'
import type { User } from "@/types/user"
import useFormRules from './useFormRules'

interface Props {
  user: User
}

const props = defineProps<Props>()
const { user } = toRefs(props)
const emit = defineEmits(['succeed', 'failed'])
const visible = ref(false)
const title = computed(() => (user.value ? '编辑' : '新增') + '用户')
const form = ref()
const formData = ref<Partial<User & { password: string }>>({})
const formRules = useFormRules(user)
const uploadAvatarAction = userApi.getUploadAvatar()

watchEffect(() => {
  if (user.value) {
    formData.value = { ...user.value }
  } else {
    formData.value = {}
  }
})

const beforeAvatarUpload = (file: File) => {
  const isJPG = file.type === 'image/jpeg'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    ElMessage.error('上传头像图片只能是 JPG 格式!')
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!')
  }
  return isJPG && isLt2M
}
const avatarUploadSuccess = (res: any) => {
  formData.value.avatarURL = res.data
}
const avatarUploadError = () => {
  ElMessage.success('用户导入失败')
}

const show = () => {
  visible.value = true
}
const close = () => {
  visible.value = false
}
const submit = () => {
  if (!form.value) return
  form.value.validate(async (flag: boolean) => {
    if (!flag) {
      return
    }
    try {
      if (user.value) {
        await userApi.updateUser(user.value.id, formData.value as User)
      } else {
        await userApi.createUser(formData.value as User)
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

<style scoped lang="scss">
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  display: inline-block;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
