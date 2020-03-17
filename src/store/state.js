const metaEl = document.querySelector('meta[name=token]')
const token = metaEl ? metaEl.content : ''
export default {
  token,
  menu: [],
  role: '',
  userInfo: {
    nick_name: '',
    account_name: '',
    phone: ''
  },
  selects: {
    brief: []
  }
}
