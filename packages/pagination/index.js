import basePagination from './src/BasePagination.vue'

basePagination.install = function (Vue) {
  Vue.component(basePagination.name, basePagination)
}

export default basePagination
