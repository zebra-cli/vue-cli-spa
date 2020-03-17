import { join } from 'path'
import NotAuth from './views/error/403.vue'

const context = require.context('./routes/health', true, /.js$/)

const hasAttach = (attach, routes) => {
  if (attach && typeof attach === 'string') return routes.some(item => item.uri === attach)
  if (Array.isArray(attach) && attach.length > 0) return routes.some(item => attach.includes(item.uri))
  return false
}

const getRoutes = (route, routes = [], parent = '/', active = '/') => {
  const fullPath = join(parent, route.path)
  const option = routes.find(item => item.uri === fullPath)
  const { id, parent_id, name, is_menu } = option || {}
  if (option) {
    route.meta = Object.assign({ name, id, parent_id }, route.meta)
    // 非menu路由，自动加上active。用于菜单高亮
    if (is_menu === '0') {
      route.meta.active = route.meta.active ? route.meta.active : active
    }
  } else {
    // 无权限的路由组件改为无权限页面组件
    const { extra, attach } = route.meta || {}
    // 无子路由，无例外，且没有权限归属，并且没有权限的路由
    const isNoAuth = !(route.children && route.children.length > 0) && !extra && !hasAttach(attach, routes)
    if (isNoAuth) {
      route.component = NotAuth
    }
  }
  if (route.children && route.children.length) {
    route.children = route.children.map(r => getRoutes(r, routes, fullPath, is_menu === '1' ? fullPath : active))
    const authChildren = route.children.filter(item => item.component !== NotAuth)
    // 如果有子级，而且没有设置redirect那么重定向至第一个有meta.default的子路由
    if (authChildren.length > 0) {
      const vaildRedirect = route.redirect ? authChildren.some(item => item.path === route.redirect) : false
      if (!vaildRedirect) {
        const { path } = authChildren.find(item => item.path.indexOf(':') === -1) || authChildren[0]
        if (path) {
          route.redirect = join(fullPath, path)
        }
      }
    }
  }
  return route
}

export default (userRoutes, parent, isAdmin) => {
  console.log(context)
  const routes = context.keys().map(file => context(file).default)
  if (isAdmin) return routes
  return routes.map(route => getRoutes(route, userRoutes, parent))
}
