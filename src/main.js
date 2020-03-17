import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/axios'
import './plugins/element.js'
import './styles/index.scss'
import comRegister from './plugins/components-register'
import * as api from './api'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Filters from './plugins/filters'

Vue.config.productionTip = false

Vue.prototype.$api = api

Vue.use(Filters)

Vue.use(comRegister)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
