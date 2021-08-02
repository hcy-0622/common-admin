import { App } from 'vue'
import { ElButton, ElMessage } from 'element-plus'

const components = [ElButton]
const plugins = [ElMessage]
const options = { size: 'small' }

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
