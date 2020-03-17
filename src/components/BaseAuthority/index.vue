<script>
import { getRole } from './util'
export default {
  name: 'BaseAuthority',

  inheritAttrs: false,

  props: {
    auth: {
      type: [Array, String],
      required: true
    },
    tag: {
      type: String,
      default: 'div'
    }
  },

  computed: {
    visible () {
      return getRole(this.auth, this.$store.state.role)
    }
  },

  render (h) {
    if (this.visible) return h(this.tag, { props: this.$attrs, on: this.$listeners }, [this.$slots.default])
    return null
  }
}
</script>

<style lang="scss" scoped></style>
