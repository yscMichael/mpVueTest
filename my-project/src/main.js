import Vue from 'vue'
import App from './App'
import Fly from 'flyio/dist/npm/wx'

Vue.config.productionTip = false
App.mpType = 'app'

let fly = new Fly
fly.config.timeout=30000;
fly.config.baseURL="https://jqapi.hao1bao.com"
Vue.prototype.$fly = fly

const app = new Vue(App)
app.$mount()
