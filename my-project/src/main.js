import Vue from 'vue'
import App from './App'
import Fly from 'flyio/dist/npm/wx'
import md5 from 'js-md5'

Vue.config.productionTip = false
App.mpType = 'app'

//通用接口
let fly = new Fly
fly.config.timeout=30000;
fly.config.baseURL="https://jqapi.hao1bao.com"
Vue.prototype.$fly = fly

//查询第三方药品
let otherFly = new Fly
otherFly.config.timeout=30000;
otherFly.config.baseURL="https://api.3023data.com"
otherFly.config.headers = {'key' : '5fa59e9d68bb357dd3ce5187174df6a1'};
Vue.prototype.$otherFly = otherFly

const app = new Vue(App)
app.$mount()

Vue.prototype.globalData = getApp().globalData
Vue.prototype.globalData.username = 'lxr001';
Vue.prototype.globalData.password = md5('123456');