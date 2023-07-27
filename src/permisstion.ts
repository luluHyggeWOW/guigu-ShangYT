import router from './router/index'
//@ts-ignore
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'
import pinia from '@/store'
import useUserStore from './store/modules/user'
Nprogress.configure({ showSpinner: false })
let userStore = useUserStore(pinia)
let noLoginList = ['/home', '/hospital/register', '/hospital/detail', 'hospital/notice', '/hospital/close', 'hospital/search']
router.beforeEach((to, from, next) => {
  Nprogress.start()
  document.title = `商医通-${to.meta.title}`
  let token = userStore.userInfo.token
  if (token) {
    next()
  } else {
    // ElMessage.error('用')
    if (noLoginList.includes(to.path)) next()
    else {
      userStore.visiable = true
      next({ path: '/home', query: { redirect: to.fullPath } })
    }
  }

})
router.afterEach((to, from) => {
  Nprogress.done()
})
