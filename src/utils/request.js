// import fetch from 'dva/fetch';

// function parseJSON(response) {
//   return response.json();
// }

// function checkStatus(response) {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   }

//   const error = new Error(response.statusText);
//   error.response = response;
//   throw error;
// }

// /**
//  * Requests a URL, returning a promise.
//  *
//  * @param  {string} url       The URL we want to request
//  * @param  {object} [options] The options we want to pass to "fetch"
//  * @return {object}           An object containing either "data" or "err"
//  */
// export default function request(url, options) {
//   return fetch(url, options)
//     .then(checkStatus)
//     .then(parseJSON)
//     .then(data => ({ data }))
//     .catch(err => ({ err }));
// }
import axios from 'axios'


//创建axios实例
const service = axios.create({
    baseURL:'http://111.231.59.56:5000/api',//process.env.BASE_API , // api的base_url 
    timeout: 25000 
})


/**
 * 添加请求拦截器
 */
service.interceptors.request.use(config =>{
   // config.headers['Authorization'] = "Bearer "+getToken();
   // config.headers['Abp.TenantId'] = getTenantId()
    // config.header('Access-Control-Allow-')
    // if(config.method=="get"){
    //     config.url = config.url + '?t='+new Date().getTime();
    // }
    return config
},error => {
    console.log(error)
    return Promise.reject(error)
})

service.interceptors.response.use(response => {
   
    return response.data
},error => {
    console.log(error)
   if(error.response.status==401){  
        // Message.error('身份信息过期！')
        // router.push('/login')
        // removeToken()
        
   }
   if(error.response.status==500){
       // Message.error(error.response.data.error.message)
   }
    return Promise.reject(error)
})

export default service