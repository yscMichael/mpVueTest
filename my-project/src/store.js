import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      str:'测试',
      num:521
    },
    mutations: {
        changeNum(state,value){
            state.num = value;
        },
        changStr(state,value){
            state.str = value;
        }
    }    
  });
export default store