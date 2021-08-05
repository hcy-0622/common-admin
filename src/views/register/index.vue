<template>
  <div class="register-container">
    <div class="register-box">
      <h2 class="register-title">欢迎注册</h2>
      <el-tabs tab-position="left">
        <el-tab-pane label="普通注册">
          <register-form type="username"></register-form>
        </el-tab-pane>
        <el-tab-pane label="邮箱注册">
          <register-form type="email"></register-form>
        </el-tab-pane>
        <el-tab-pane disabled label="手机注册"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import RegisterForm from './RegisterForm.vue'
</script>

<style scoped>
.register-container {
  @apply w-screen h-screen bg-cover bg-no-repeat;
  background: url("../../assets/bg.jpg");
}
.register-box {
  @apply absolute top-1/2 left-1/2  rounded-lg bg-white p-8;
  width: 640px;
  transform: translate(-50%, -50%);
}
.register-title {
  @apply text-center text-2xl font-bold mb-4;
}
</style>
