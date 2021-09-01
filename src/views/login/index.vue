<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="login-title">欢迎登录</h2>
      <el-form ref="form" :model="formData" :rules="formRules">
        <el-form-item prop="username">
          <el-input
            v-model="formData.username"
            prefix-icon="el-icon-user"
            placeholder="用户名 / 邮箱 / 手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-row>
            <el-col :span="18">
              <el-input v-model="formData.captcha" prefix-icon="el-icon-lock" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="6">
              <img ref="captchaImg" :src="captchaSrc" alt @click="updateCaptcha" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button class="w-full" type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
      <ul class="flex justify-around">
        <li>
          <icon icon="qq" class="text-2xl cursor-pointer"></icon>
        </li>
        <li>
          <icon icon="weixin" class="text-2xl cursor-pointer"></icon>
        </li>
        <li>
          <icon icon="weibo" class="text-2xl cursor-pointer"></icon>
        </li>
        <li>
          <a :href="githubHref">
            <icon icon="github" class="text-2xl"></icon>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import Icon from '@/components/Icon.vue'
import { EMAIL_REGEX, PHONE_REGEX } from '@/constants/validate'
import useFormRules from './useFormRules'
import userApi from '@/api/user'
import type { LoginData } from '@/api/user'

const router = useRouter()
const form = ref()
const formData = reactive<LoginData>({
  username: '',
  password: '',
  captcha: '',
  type: 'username',
})
const formRules = useFormRules()
const captchaImg = ref()
const captchaSrc = userApi.getImageCode()
const githubHref = userApi.getGithubPassport()

const handleFormData = () => {
  const username = formData.username as string
  if (EMAIL_REGEX.test(username)) {
    formData.email = username
    formData.type = 'email'
  } else if (PHONE_REGEX.test(username)) {
    formData.phone = username
    formData.type = 'phone'
  } else {
    formData.type = 'username'
  }
}

const updateCaptcha = () => {
  if (captchaImg.value) {
    captchaImg.value.src = `${captchaSrc}?r=${Math.random()}`
  }
}

onMounted(updateCaptcha)

const login = () => {
  if (!form.value) {
    return
  }
  form.value.validate((flag: boolean) => {
    if (!flag) return
    handleFormData()
    userApi.login(formData).then((result) => {
      sessionStorage.setItem('user_info', JSON.stringify(result.data))
      // sessionStorage.setItem('token', result.data.token)
      router.push('/admin')
    })
  })
}
</script>

<style scoped>
.login-container {
  @apply w-screen h-screen bg-cover bg-no-repeat;
  background: url("../../assets/bg.jpg");
}
.login-box {
  @apply absolute top-1/2 left-1/2 rounded-lg bg-white p-8;
  width: 480px;
  transform: translate(-50%, -50%);
}
.login-title {
  @apply text-center text-2xl font-bold mb-4;
}
</style>
