import baseUpload from './src/BaseUpload.vue'

baseUpload.install = function (Vue) {
  Vue.component(baseUpload.name, baseUpload)
}
export default baseUpload
