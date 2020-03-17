export default {
  install (Vue) {
    Vue.filter('money', (value, dec = 2) => {
      const v = Number(value)
      if (isNaN(v)) return value
      return v.toFixed(dec)
    })
  }
}
