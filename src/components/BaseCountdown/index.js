import Countdown from './src/Countdown.vue'
export default {
  install (Vue) {
    Vue.component(Countdown.name, Countdown)
  }
}
