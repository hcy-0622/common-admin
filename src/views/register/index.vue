<template>
  <div class="register-container">
    <div class="register-box">
      <h1>欢迎注册</h1>
      <el-tabs tab-position="left" @tab-click="tabClick">
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
import RegisterForm from './register-form.vue'
const tabClick = () => { }
</script>

<style scoped lang="scss">
.register-container {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/bg.jpg") no-repeat;
  background-size: cover;

  .register-box {
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
      padding-right: 20px;
      box-sizing: border-box;
    }
  }
}
</style>
