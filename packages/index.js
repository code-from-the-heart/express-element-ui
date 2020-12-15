import table from './table/index'
import svgIco from './svgIcon/index'
import pagination from './pagination/index'
import search from './search/index'
import systemTips from './systemTips/index'
import sys404 from './404/index'
import buttomBar from './buttomBar/index'
import AutoTable from './autoTable/index'
import SearchTable from './searchTable/index'
import NhcTooltip from './nhcTooltip/index'
import upload from './upload/index'

// 指令
import directive from './directives/index.js'
// svg 资源
import './assets/icons/index.js'
// css
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'

window.NHC_COMMON_UI = process.env.VUE_APP_VERSION

// window.nhcPortal = new NhcPortal(window.PORTAL_VERSION)
const components = [
  table,
  svgIco,
  pagination,
  search,
  systemTips,
  sys404,
  buttomBar,
  AutoTable,
  SearchTable,
  NhcTooltip,
  upload
]

// 定义 install 方法
const install = function (Vue) {
  if (install.installed) return
  install.installed = true
  components.map(component => {
    Vue.component(component.name, component)
  })
  Vue.use(directive)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  // 导出的对象必须具备一个 install 方法
  install,
  // 组件列表
  ...components
}
