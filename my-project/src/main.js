import Vue from 'vue'
import App from './App'

<!-- 关闭Vue的生产提示消息 -->
Vue.config.productionTip = false
<!-- 生命当前组件的类型 -->
App.mpType = 'app'

<!-- 中间可以暴漏全局组件接口!!!! -->

<!-- 生成应用实例 -->
const app = new Vue(App)
<!-- 挂载整个应用 -->
app.$mount()
