import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

export default class {
  constructor (opt) {
    const { delay = 300, debug } = opt || {}
    this.delay = delay
    this.debug = debug
    this.startTime = Date.now()
  }
  start () {
    const now = Date.now()
    if (NProgress.isStarted()) return
    this.startTime = now
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.timer = null
      if (!NProgress.isStarted()) {
        NProgress.start()
        this.debug && console.log('progress start')
      }
    }, this.delay)
  }
  done () {
    // 小于设定的延迟时间，直接清除定时器不开启加载提示条
    const now = Date.now()
    if (NProgress.isStarted()) {
      NProgress.done()
      this.startTime = now
      this.debug && console.log('progress done')
    } else if (now - this.startTime < this.delay && this.timer) {
      clearTimeout(this.timer)
      this.timer = null
      this.debug && console.log('progress cancel')
    }
  }
}
