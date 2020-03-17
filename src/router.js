import Vue from 'vue'
import Router from 'vue-router'
import * as utils from '@/utils'
import Layout from './components/Layout'
import store from './store'
import { UPDATE_AUTHORITY } from './store/mutation-types'

Vue.use(Router)

const nploading = new utils.Loading({ delay: 1000 })

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'dashboard',
        meta: {
          title: 'dashboard'
        },
        component: () => import('./views/Dashboard')
      },
    ]
  },
  {
    path: '/403',
    name: '403',
    component: () => import('./views/error/403')
  },
  {
    path: '*',
    name: '404',
    component: () => import('./views/error/404')
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes,
  linkActiveClass: 'is-active'
})

const whiteList = [ 'login', '403', '404', 'findpwd' ]

let isError = false

router.beforeEach(async (to, from, next) => {
  /**
 * @todo 因为测试接口报错会导致路由跳转出问题，需要加上一个isError参数
 */
  if (to.query.isError) {
    isError = false
  }
  if (isError) {
    if (whiteList.includes(to.name)) return next()
    return next('/login')
  }
  // 开启进度条
  nploading.start()
  // 改变文档标题
  const { title, name } = to.meta || {}
  if (title) {
    document.title = name || title
  }
  const { auth } = to.meta
  try {
    await store.dispatch(UPDATE_AUTHORITY)
    if (auth) {
      if (auth.includes(store.state.role)) return next()
      return next('/403')
    }
    if (to.name === 'login') return next('/')
  } catch (e) {
    console.error(e)
    isError = e.isAxiosError
    if (whiteList.includes(to.name)) return next()
    if (to.name.includes('/admin')) return next('/admin/login')
    return next('/login')
  }
  next()
})

router.afterEach(() => nploading.done())

export default router
