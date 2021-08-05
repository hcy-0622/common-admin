<template>
  <el-form ref="form" :model="formData" :rules="formRules">
    <el-form-item v-if="type === 'username'" prop="username">
      <el-input v-model="formData.username" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item v-else-if="type === 'email'" prop="email">
      <el-input v-model="formData.email" prefix-icon="el-icon-message" placeholder="请输入邮箱"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="formData.password"
        type="password"
        prefix-icon="el-icon-message"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item v-if="type === 'username'" prop="captcha">
      <el-row>
        <el-col :span="18">
          <el-input v-model="formData.captcha" prefix-icon="el-icon-lock" placeholder="请输入验证码"></el-input>
        </el-col>
        <el-col :span="6">
          <img ref="captchaImg" :src="captchaSrc" alt @click="updateCaptcha" />
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item v-else-if="type === 'email'" prop="captcha">
      <el-row>
        <el-col :span="18">
          <el-input v-model="formData.captcha" prefix-icon="el-icon-lock" placeholder="请输入验证码"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button @click="sendEmailCode">发送验证码</el-button>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button class="w-full" type="primary" @click="register">注册</el-button>
    </el-form-item>
    <el-form-item prop="checked">
      <el-checkbox v-model="formData.checked">
        <p>
          阅读并接受
          <a href="javascript:;">《xx用户协议》</a>
          及
          <a href="javascript:;">《xx隐私权保护声明》</a>
        </p>
      </el-checkbox>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import type { RegisterType, RegisterFormData } from '@/types/user'
import userApi from '@/api/user'
import useFormRules from './useFormRules'

interface Props {
  type: RegisterType
}

const props = defineProps<Props>()
const router = useRouter()
const form = ref()
const formData = reactive<RegisterFormData>({
  password: '',
  captcha: '',
  type: props.type,
  checked: false,
})
const formRules = useFormRules(props.type)
const captchaImg = ref<HTMLImageElement>()
const captchaSrc = userApi.getImageCode()

const register = () => {
  if (!form.value) {
    return
  }
  form.value.validate((flag: boolean) => {
    if (!flag) return
    userApi.register(formData).then(() => {
      router.push('/login')
    })
  })
}

const sendEmailCode = () => {
  userApi.sendEmailCode(formData.email as string).then(() => {
    ElMessage.success('验证码已发送')
  })
}
const updateCaptcha = () => {
  if (captchaImg.value) {
    captchaImg.value.src = `${captchaSrc}?r=${Math.random()}`
  }
}
</script>
