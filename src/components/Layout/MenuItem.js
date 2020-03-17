import path from 'path'
export default {
  name: 'MenuItem',

  functional: true,

  props: {
    route: Object,
    parentPath: {
      type: String,
      default: ''
    },
    role: {
      type: [String, Number],
      required: true
    }
  },

  render (h, context) {
    const { route, parentPath, role } = context.props
    if (!route) return null
    const hidden = route.meta?.hidden ?? false
    const auth = route.meta?.auth ?? []
    // 判断权限
    if (auth.length && !auth.includes(role)) return null
    // 判断是否隐藏
    if (hidden) return null
    // 拼接路由
    const index = /^\//.test(route.path) ? route.path : path.join(parentPath, route.path)
    const children = route.children ?? []
    const title = route.meta?.title ?? route.name
    if (children.length > 0) {
      return (<el-submenu index={index}>
        <template slot="title">
          <i class={route.meta?.icon}></i>
          <span>{title || name}</span>
        </template>
        {children.map(item => <menu-item route={item} parent-path={index} role={role}/>)}
      </el-submenu>)
    }
    return <el-menu-item index={index}>{title}</el-menu-item>
  }
}
