<template>
  <div class="login-container">
    <div class="login-box">
      <h1>欢迎登录</h1>
      <el-form ref="form" :model="formData" :rules="formRules" label-width="0">
        <el-form-item label prop="username">
          <el-input
            v-model="formData.username"
            prefix-icon="el-icon-user"
            placeholder="用户名 / 邮箱 / 手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label prop="password">
          <el-input
            type="password"
            v-model="formData.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label prop="captcha">
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
          <el-button style="width: 100%" type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
      <ul class="auth-box">
        <li>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-qq" />
          </svg>
        </li>
        <li>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-weixin" />
          </svg>
        </li>
        <li>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-weibo" />
          </svg>
        </li>
        <li>
          <a :href="githubHref">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-github" />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from 'vue-router'

import type { LoginData } from "@/types/user";
import { EMAIL_REGEX, PHONE_REGEX } from "@/constants/validate";
import useFormRules from "./useFormRules";
import userApi from "@/api/user";

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

const login = () => {
  if (!form.value) {
    return
  }
  form.value.validate((flag: boolean) => {
    if (!flag) return
    handleFormData()
    userApi.login(formData)
      .then(() => {
        // sessionStorage.setItem('token', result.data.token)
        router.push('/admin')
      })
  })
}
</script>

<style scoped lang="scss">
.login-container {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/bg.jpg") no-repeat;
  background-size: cover;
  .login-box {
    width: 600px;
    height: 420px;
    background: #fff;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    h1 {
      text-align: center;
    }
    a {
      text-decoration: none;
    }
    .el-form {
      padding: 0 20px;
      box-sizing: border-box;
    }
    .auth-box {
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: space-around;
      font-size: 30px;
    }
  }
}
</style>
