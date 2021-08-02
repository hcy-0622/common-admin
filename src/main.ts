import { createApp } from 'vue'
import 'normalize.css'
import 'element-plus/packages/theme-chalk/src/base.scss'

import App from './App.vue'
import router from './router'
import useElement from './element'

const app = createApp(App)
app.use(router)
useElement(app)
app.mount('#app')
