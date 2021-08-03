import { createApp } from 'vue'
import 'element-plus/packages/theme-chalk/src/base.scss'

import App from './App.vue'
import router from './router'
import useElement from './element'
import './styles/index.scss'
import './assets/iconfont/iconfont'

const app = createApp(App)
app.use(router)
useElement(app)
app.mount('#app')
