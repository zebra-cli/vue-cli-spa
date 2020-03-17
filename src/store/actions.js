import * as types from './mutation-types'
import * as api from '../api'
import secret from '@/lib/secret'
export default {
  [types.UPDATE_TOKEN]: ({ commit }) => api.getToken().then(data => {
    commit(types.UPDATE_TOKEN, data.token)
    secret.init(data)
    return data.token
  }),
}
