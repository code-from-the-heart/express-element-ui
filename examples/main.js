import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import nhcCommon from '../packages/index'
import demoBlock from './components/demo-block'
import './styles/index.scss'
import 'highlight.js/styles/color-brewer.css'

// svg 资源
import './assets/icons/index.js'

Vue.component('demo-block', demoBlock)
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(ElementUI)
Vue.use(nhcCommon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
