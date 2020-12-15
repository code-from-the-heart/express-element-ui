<template>
    <article>
     <el-table
      class="nhc-table"
      v-loading="tableLoading"
      :data="tableData"
      :stripe="stripe"
      :border="border"
      header-cell-class-name="nhc-table--head"
      v-bind="tableConfig"
      v-on="$listeners">
      <template v-for="(item, index) in colConfigs">
        <slot v-if="item.slot" :name="item.slot" ></slot>
        <component v-else-if="item.component" :is="item.component" :col-config="item" :key="index + 1"></component>
        <el-table-column v-else show-overflow-tooltip v-bind="item" :key="index + 1" :width="item.width || ''"></el-table-column>
      </template>
      </el-table>
    </article>
</template>

<script>

export default {
  name: 'nhcTable',
  inheritAttrs: false,
  props: {
    tableConfig: {
      type: Object,
      default: _ => ({})
    },
    colConfigs: {
      type: Array,
      default: _ => ([])
    },
    tableData: {
      type: Array,
      default: _ => ([])
    },
    border: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean,
      default: true
    },
    tableLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang='scss'>

</style>
