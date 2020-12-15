import baseTable from './src/BaseTable.vue'

baseTable.install = function (Vue) {
  Vue.component(baseTable.name, baseTable)
}
export default baseTable
