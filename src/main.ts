import { createApp } from 'vue'
import App from '@/App.vue'
import '@/style/reset.scss'
import HospitalTop from '@/components/top/index.vue'
import HospitalBottom from '@/components/bottom/index.vue'
import Login from '@/components/login/index.vue'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import pinia from '@/store'
const app = createApp(App)
app.component('HospitalTop', HospitalTop)
app.component('HospitalBottom', HospitalBottom)
app.component('Login', Login)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(pinia)
app.mount('#app')