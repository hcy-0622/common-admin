import { computed, Ref } from 'vue'
import { EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX, USERNAME_REGEX } from '@/constants/validate'
import { User } from '@/types/user'

const usernamePass = (_rule: any, value: string, callback: any): void => {
  const regex = USERNAME_REGEX
  if (!value) {
    callback(new Error('请填写用户名'))
  } else if (value.length < 4) {
    callback(new Error('用户名至少4位'))
  } else if (!regex.test(value)) {
    callback(new Error('用户名只能是字母或数字'))
  } else {
    callback()
  }
}
const emailPass = (_rule: any, value: string, callback: any): void => {
  const regex = EMAIL_REGEX
  if (value && !regex.test(value)) {
    callback(new Error('邮箱格式不正确'))
  } else {
    callback()
  }
}
const phonePass = (rule: any, value: string, callback: any) => {
  const reg = PHONE_REGEX
  if (value && !reg.test(value)) {
    callback(new Error('手机格式不正确'))
  } else {
    callback()
  }
}

const useFormRules = (user: Ref<User | undefined>) => {
  const formRules = computed(() => {
    const passwordPass = (_rule: any, value: string, callback: any): void => {
      const regex = PASSWORD_REGEX
      if (user.value) {
        // 编辑时可以不输入密码
        if (value) {
          if (value.length < 6) {
            callback(new Error('密码至少6位'))
          } else if (!regex.test(value)) {
            callback(new Error('密码必须包字母数字和特殊符号'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      } else {
        // 新增必须传入密码
        if (!value) {
          callback(new Error('请填写密码'))
        } else if (value.length < 6) {
          callback(new Error('密码至少6位'))
        } else if (!regex.test(value)) {
          callback(new Error('密码必须包字母数字和特殊符号'))
        } else {
          callback()
        }
      }
    }

    return {
      username: [{ validator: usernamePass, trigger: 'blur' }],
      email: [{ validator: emailPass, trigger: 'blur' }],
      phone: [{ validator: phonePass, trigger: 'blur' }],
      password: [{ validator: passwordPass, trigger: 'blur' }],
    }
  })

  return formRules
}

export default useFormRules
