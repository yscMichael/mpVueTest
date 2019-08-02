import Vue from 'vue'
import App from './App'
import Fly from 'flyio/dist/npm/wx'
import md5 from 'js-md5'

Vue.config.productionTip = false
App.mpType = 'app'

let fly = new Fly
fly.config.timeout=30000;
fly.config.baseURL="https://jqapi.hao1bao.com"
Vue.prototype.$fly = fly

const app = new Vue(App)
app.$mount()

Vue.prototype.globalData = getApp().globalData
Vue.prototype.globalData.username = 'lxr001';
Vue.prototype.globalData.password = md5('123456');