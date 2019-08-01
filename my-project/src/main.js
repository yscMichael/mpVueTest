import Vue from 'vue'
import App from './App'
import Fly from 'flyio/dist/npm/wx'

Vue.config.productionTip = false
App.mpType = 'app'

let fly = new Fly
Vue.prototype.$fly = fly

const app = new Vue(App)
app.$mount()
