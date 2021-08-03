import { reactive } from 'vue'
import {
  CAPTCHA_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  PHONE_REGEX,
  USERNAME_REGEX,
} from '@/constants/validate'

const usernamePass = (_rule: any, value: string, callback: any): void => {
  if (!value) {
    callback(new Error('请填写用户名'))
  } else if (
    !USERNAME_REGEX.test(value) &&
    !EMAIL_REGEX.test(value) &&
    !PHONE_REGEX.test(value)
  ) {
    callback(new Error('账号格式不正确'))
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

const useFormRules = () => {
  const formRules = reactive({
    username: [{ validator: usernamePass, trigger: 'blur' }],
    password: [{ validator: passwordPass, trigger: 'blur' }],
    captcha: [{ validator: captchaPass, trigger: 'blur' }],
  })

  return formRules
}

export default useFormRules
