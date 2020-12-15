<template>
  <el-select
    placeholder="请选择"
    :multiple="isMul"
    v-model="selectValue"
    v-bind="$attrs"
    v-on="$listeners"
    class="nhc-select-box"
    filterable
    clearable>
    <el-option
      v-for="(item, index) in selectOptions" :key="index"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled || false">
      </el-option>
  </el-select>
</template>

<script>

export default {
  name: 'baseSelect',
  data () {
    return {
      selectValue: this.value
    }
  },
  props: {
    // 默认值
    value: {
      type: [Number, String, Array, Object]
    },
    isMul: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    selectOptions () {
      return this.options || []
    }
  },
  methods: {
    change () {
    }
  },
  watch: {
    // defaultValue: {
    //   handler (val) {
    //     if (val) {
    //       this.selectValue = val
    //       this.$emit('change', this.$attrs.queryItem)
    //     }
    //   },
    //   immediate: true
    // }
    value: {
      handler (val) {
        this.selectValue = val
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.nhc-select-box {
  width: 100%;
}
</style>
