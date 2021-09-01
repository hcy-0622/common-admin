import { reactive } from 'vue'
import { RegisterType } from '@/api/user'
import { CAPTCHA_REGEX, EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from '@/constants/validate'

const usernamePass = (_rule: any, value: string, callback: any): void => {
  if (!value) {
    callback(new Error('请填写用户名'))
  } else if (value.length < 4) {
    callback(new Error('用户名至少4位'))
  } else if (!USERNAME_REGEX.test(value)) {
    callback(new Error('用户名只能是字母或数字'))
  } else {
    callback()
  }
}
const emailPass = (_rule: any, value: string, callback: any): void => {
  if (!value) {
    callback(new Error('请填写邮箱'))
  } else if (!EMAIL_REGEX.test(value)) {
    callback(new Error('邮箱格式不正确'))
  } else {
    callback()
  }
}
const passwordPass = (_rule: any, value: string, callback: any): void => {
  if (!value) {
    callback(new Error('请填写密码'))
  } else if (value.length < 6) {
    callback(new Error('密码至少6位'))
  } else if (!PASSWORD_REGEX.test(value)) {
    callback(new Error('密码必须包字母数字和特殊符号'))
  } else {
    callback()
  }
}
const captchaPass = (_rule: any, value: string, callback: any): void => {
  if (!value) {
    callback(new Error('请填写验证码'))
  } else if (value.length < 4) {
    callback(new Error('验证码至少4位'))
  } else if (!CAPTCHA_REGEX.test(value)) {
    callback(new Error('验证码只能是字母或数字'))
  } else {
    callback()
  }
}
const checkedPass = (_rule: any, value: string, callback: any): void => {
  if (!value) {
    callback(new Error('请阅读并同意用户协议'))
  } else {
    callback()
  }
}

const useFormRules = (type: RegisterType) => {
  const formRules = reactive<any>({
    // email: [{ validator: emailPass, trigger: 'blur' }],
    password: [{ validator: passwordPass, trigger: 'blur' }],
    captcha: [{ validator: captchaPass, trigger: 'blur' }],
    checked: [{ validator: checkedPass, trigger: 'change' }],
  })

  if (type === 'username') {
    formRules.username = [{ validator: usernamePass, trigger: 'blur' }]
  } else if (type === 'email') {
    formRules.email = [{ validator: emailPass, trigger: 'blur' }]
  }

  return formRules
}

export default useFormRules
