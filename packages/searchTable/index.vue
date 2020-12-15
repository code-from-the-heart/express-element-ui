<template>
  <div class="container-wrapper">
    <search-menu
      ref="searchForm"
      class="menu"
      :search-list="data.searchMenu"
      :value="data.searchMenuValue"
      @search="handleSearchClick"
      @reset="handleResetClick"
      v-on="$listeners"
    >
      <template v-slot:searchBtnFont>
        <slot name="searchBtnFont" />
      </template>
      <template v-slot:searchBtnEnd>
        <slot name="searchBtnEnd" />
      </template>
      <template v-slot:default>
        <slot name="searchBottom" />
      </template>
    </search-menu>

    <slot />

    <!-- 列表 list -->
    <auto-table ref="cTable" :data="data" v-bind="$attrs" v-on="$listeners">
      <template v-slot:header>
        <slot name="header" />
      </template>
      <template v-slot:aside>
        <slot name="aside" />
      </template>
    </auto-table>
  </div>
</template>

<script>
import AutoTable from '../autoTable/index.vue'
import SearchMenu from '../search/src/SearchArea.vue'

export default {
  name: 'SearchTable',
  components: {
    AutoTable,
    SearchMenu
  },
  props: {
    data: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {}
  },

  methods: {
    // getTable
    getTable (params) {
      this.$refs.cTable.tableList(params)
    },
    // 搜索
    handleSearchClick (params) {
      this.$refs.cTable.handleSearchClick(params)
    },
    // 重置
    handleResetClick (params) {
      this.$refs.cTable.handleResetClick(params)
    }
  }
}
</script>

<style lang="scss" scoped>
.container-wrapper {
  background: #f2f2f2 !important;
}

.menu {
  padding: 24px 24px 10px !important;
  margin-bottom: 16px;
  background: #ffffff;
}
</style>
