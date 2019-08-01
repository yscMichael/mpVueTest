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
    
}

//对外暴漏
export default{
    postRequest,
    getRequest
}
