import axios from 'axios'
let http = axios.create({
    // baseURL:'',//基础地址
    // timeout:  //超时控制
})

http.interceptors.request.use((req)=>{
    /* 
        使用场景：
        一般全局添加请求头！！！
    */
   //添加请求头
//    req.headers.token = 123
 req.headers.authorization = sessionStorage.getItem('user')?JSON.parse(sessionStorage.getItem('user')).token :''
    return req
})

http.interceptors.response.use((res)=>{
    //全局拦截统一错误 比如token失效
    //针对返回的结果进行统一设置！！！
    return res.data
})


export default http