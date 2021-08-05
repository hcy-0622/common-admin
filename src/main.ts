import { createApp } from 'vue'
import 'virtual:windi.css'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import App from './App.vue'
import router from './router'
import './styles/index.css'
import './assets/iconfont/iconfont'

const app = createApp(App)
app.use(router)
app.use(ElementPlus, { size: 'medium' })
app.mount('#app')
