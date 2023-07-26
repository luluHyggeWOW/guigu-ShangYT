import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  // 路由模式设置
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      component: () => import('@/pages/home/index.vue')
    },
    {
      path: '/hospital',
      component: () => import('@/pages/hospital/index.vue'),
      children: [
        {
          path: 'register',
          component: () => import('@/pages/hospital/register/index.vue'),
        },
        {
          path: 'detail',
          component: () => import('@/pages/hospital/detail/index.vue'),
        },
        {
          path: 'notice',
          component: () => import('@/pages/hospital/notice/index.vue'),
        },
        {
          path: 'close',
          component: () => import('@/pages/hospital/close/index.vue'),
        },
        {
          path: 'search',
          component: () => import('@/pages/hospital/search/index.vue'),
        },
        {
          path: 'register_step1',
          component: () => import('@/pages/hospital/register/register_step1.vue'),
        },
        {
          path: 'register_step2',
          component: () => import('@/pages/hospital/register/register_step2.vue'),
        },
      ]
    },
    {
      path: '/wxlogin',
      component: () => import('@/pages/wxlogin/index.vue')
    },
    {
      path: '/user',
      component: () => import('@/pages/user/index.vue'),
      children: [
        {
          path: 'certification',
          component: () => import('@/pages/user/certification/index.vue'),
        },
        {
          path: 'feedback',
          component: () => import('@/pages/user/feedback/index.vue'),
        },
        {
          path: 'order',
          component: () => import('@/pages/user/order/index.vue'),
        },
        {
          path: 'patient',
          component: () => import('@/pages/user/patient/index.vue'),
        },
        {
          path: 'profile',
          component: () => import('@/pages/user/profile/index.vue'),
        },
        // {
        //   path: 'register_step1',
        //   component: () => import('@/pages/hospital/register/register_step1.vue'),
        // },
        // {
        //   path: 'register_step2',
        //   component: () => import('@/pages/hospital/register/register_step2.vue'),
        // },
      ]
    },
    {
      path: '/',
      redirect: '/home'
    },

  ],
  // 滚动行为 控制滚动条位置
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})