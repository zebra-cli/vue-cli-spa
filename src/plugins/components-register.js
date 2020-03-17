export default {
  install (Vue) {
    const context = require.context('../components', true, /index\.(vue|js)/)
    for (let key of context.keys()) {
      const component = context(key).default
      if (component.install) {
        component.install(Vue)
      } else {
        Vue.component(component.name, component)
      }
    }
  }
}
