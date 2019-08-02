import Fly from 'flyio/dist/npm/wx'

//post请求
export function postRequest (url, params, onSuccess, onFail){
    request(url, params, "POST", onSuccess, onFail);
}

//get请求
export function getRequest(url, params, onSuccess, onFail){
    request(url, params, "GET", onSuccess, onFail);
}

//统一网络请求
function request(url, params, method, onSuccess, onFail){
    var fly=new Fly;

    fly.get('https://jqapi.hao1bao.com/sys?op=Login&subname=gmi&username=10000&password=e10adc3949ba59abbe56e057f20f883e&push_channel=0dd9306d0fb2c32ad0ea36ad037183bc&appos=2&appver=1.8.0&_type=json')
    .then(function(response){
        console.log(response.data);
    })
    .catch(function(error){
        console.log(error);
    });
}

//对外暴漏
export default{
    postRequest,
    getRequest
}
