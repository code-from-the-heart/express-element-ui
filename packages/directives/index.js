import dialogDrag from './dialogDrag.js'

// 指令集
const directives = {
  dialogDrag
}

export default {
  install (Vue) {
    Object.keys(directives).forEach(t => {
      Vue.directive(t, directives[t])
    })
  }
}
