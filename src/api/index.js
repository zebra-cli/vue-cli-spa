import axios from '@/plugins/axios'
import * as utils from '@/utils'

const cache = {}
/**
 * 获取token
 */
export const getToken = () => {
  if (cache.token) return cache.token
  cache.token = axios.get(utils.setBaseURL('/token'), {}, { responseType: 'text' }).then(({ data }) => {
    return data
  }).finally(() => {
    delete cache.token
  })
  return cache.token
}

export const login = data => axios.post('/login', data, { loading: 'login' }).then(res => res.data?.message || '登录成功')

/**
 * 重置密码
 * @typedef {Object} resetParams
 * @property {String} newPassword
 * @property {String} confirmPassword
 * @property {String} phone
 * @property {String} code
 * @property {String} business 修改密码2，重置密码3
 * @param {resetParams} data
 */
export const resetPassword = data => axios.post('/home/user/resetPassword', data, { loading: 'reset' }).then(res => res?.data?.message || '操作成功')

export const getAuthority = (id) => {
  if (cache.authority) return cache.authority
  return (cache.authority = axios.post('/home/user/info', { id }, { loading: 'userinfo', silent: true }).then(res => res.data?.data ?? { permissions: [] }, error => {
    cache.authority = null
    return Promise.reject(error)
  }))
}

/**
 * 获取用户信息
 */
export const getUserInfo = getAuthority
