import netUtil from '@/pages/Tool/netUtil'

export function loginRequest(userName, password,onSuccess, onFail){
    console.log('登陆成功了');
    var params = {
        op: "Login",
        subname: "gmi",
        username: '',
        password: '',
        push_channel: "",
        appos: "4",
      }
    netUtil.getRequest('/sys',params,function(success){

    },function(fail){
        
    });
}

export default{
    loginRequest
}