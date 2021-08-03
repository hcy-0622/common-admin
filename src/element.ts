import { App } from 'vue'
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElMessage,
  ElTabs,
  ElTabPane,
  ElInput,
  ElCheckbox,
  ElRow,
  ElCol,
} from 'element-plus'

const components = [
  ElButton,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElRow,
  ElCol,
]
const plugins = [ElMessage]
const options = { size: 'medium' }

const useElement = (app: App<Element>) => {
  app.config.globalProperties.$ELEMENT = options
  components.forEach((component) => {
    app.component(component.name, component)
  })
  plugins.forEach((plugin) => {
    app.use(plugin)
  })
}

export default useElement
