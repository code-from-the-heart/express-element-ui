<script>
import getInputRender from './getInput.js'

export default {
  name: 'FieldItem',
  functional: true,
  components: {
  },
  props: {
    value: {
      type: [Number, String, Array, Date],
      default: ''
    },
    query: {
      type: Object,
      default: () => { return {} }
    }
  },
  render (h, context) {
    const fieldItemRender = getInputRender(h, context)
    return fieldItemRender()
  },
  created () {
  }
}
</script>
<style lang="scss" scoped>

</style>
