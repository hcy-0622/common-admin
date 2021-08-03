<template>
  <el-dialog :title="(user ? '编辑' : '新增') + '用户'" :visible="visible" width="30%" @close="resetForm">
    <el-form ref="form" :model="formData" :rules="formRules" label-width="0">
      <el-form-item prop style="text-align: center">
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:7001/api/v1/upload_avatar"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
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

    <span slot="footer" class="dialog-footer">
      <el-button @click="resetForm">取 消</el-button>
      <el-button type="primary" @click="submitUser">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script setup lang="ts">

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
