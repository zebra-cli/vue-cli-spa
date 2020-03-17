import Vue from 'vue'
import axios, { httpErrorMessage } from '@/lib/axios'
import store from '../store'
import { MessageBox } from 'element-ui'
import { UPDATE_TOKEN } from '../store/mutation-types'
import * as utils from '@/utils'
const exclude = []
Vue.use(axios, {
  beforeSend ({ url, options = {}, params }) {
    // 禁止Message提示
    if (options.silent && !exclude.includes(url)) {
      exclude.push(url)
    }
    if (url.includes('token')) return
    if (process.env.NODE_ENV !== 'production' && store.state.token.includes('csrf_token')) {
      return store.dispatch(UPDATE_TOKEN)
    }
    if (!store.state.token) return store.dispatch(UPDATE_TOKEN)
  },
  interceptors: (config) => {
    if (process.env.NODE_ENV !== 'production' && !/^\/(mock|api)/.test(config.url)) {
      config.baseURL = '/api'
    }
    config.headers['X-CSRF-TOKEN'] = store.state.token
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    return config
  },
  responseHandler (data, response) {
    const { errcode } = data || {}
    if (typeof errcode === 'number' && errcode !== 0) {
      return Promise.reject(response)
    }
    return response
  },
  errorHandler (error) {
    if (!error) return
    const { config = {}, data = {}, response = {} } = error
    const { status } = response
    if (status === 419) {
      MessageBox.alert('登录已过期，点击确认刷新', '提示').then(() => {
        window.location.reload()
      })
    }
    const showMessage = !config.url || !exclude.includes(config.url.replace(config.baseURL || '', ''))
    const message = data.message || error.message
    if (status === 500) {
      utils.alertMessage('出了一点小状况,技术人员正在处理')
    }
    if (showMessage && message) {
      const msg = (status === 404 ? `${httpErrorMessage[status]}:${config.url}` : httpErrorMessage[status]) || message
      utils.alertMessage(msg)
    }
    // 只捕获500错误
    if (window.errorHandler && status === 500) {
      const { url, params } = config
      const { username: account } = store.getters.userInfo
      const { trace, ...data } = response.data || {}
      window.errorHandler({
        message,
        data: {
          url,
          data,
          params,
          account
        }
      })
    }
    return error
  }
})

export default axios
