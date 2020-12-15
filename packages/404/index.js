import sys404 from './src/404.vue'

sys404.install = function (Vue) {
  Vue.component(sys404.name, sys404)
}

export default sys404
