import Vue from 'vue'
import menuDetail from './menuDetail'

// add this to handle exception
Vue.config.errorHandler = function (err) {
  if (console && console.error) {
    console.error(err)
  }
}

const menu = new Vue(menuDetail)
menu.$mount()
