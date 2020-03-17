import * as types from './mutation-types'
export default {
  [types.UPDATE_TOKEN]: (state, payload) => {
    state.token = payload
  },
  [types.UPDATE_AUTHORITY]: (state, payload) => {
    const { permissions, roles = {} } = payload
    state.menu = permissions
    state.role = roles.id
    state.userInfo = payload
  },
  /**
   * 获取代理下拉列表
   */
  [types.PROXY_SELECT]: (state, payload) => {
    state.selects.brief = payload
  }
}
