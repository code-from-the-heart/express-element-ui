<template>
  <div class="align-right pt10 pb20">
    <el-pagination
      ref='elPagination'
      :current-page="currentPage"
      :layout="layout"
      :hide-on-single-page="!show"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      v-on="$listeners"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: 'nhcPagination',
  inheritAttrs: false,
  props: {
    pageSizes: {
      type: Array,
      default: function () {
        return [10, 20, 30, 40, 50]
      }
    },
    total: {
      type: Number,
      default: 0
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    // 当前页数
    currentPage: {
      type: Number,
      default: 1
    }
  },
  computed: {
    show () {
      return this.total && +this.total > 10
    }
  },
  watch: {
    currentPage: {
      handler (val) {
        // console.log(val)
      }
    }
  },
  methods: {
    // 手动修改页面page
    emitChangePage (page) {
      this.$refs.elPagination.internalCurrentPage = page
      this.$refs.elPagination.lastEmittedPage = page
    },
    // 手动修改页面size
    emitChangeSize (size) {
      this.$refs.elPagination.internalPageSize = size
    }
  }
}
</script>

<style lang="scss" scoped>
.align-right {
  text-align: right;
}
.pt10 {
  padding-top: 10px;
}
.pb20 {
  padding-bottom: 20px;
}
</style>
