/*
 * @Descripttion: axios封装
 * @Author: Irene.Z
 * @Date: 2020-12-15 19:24:16
 * @LastEditTime: 2021-09-21 16:22:58
 * @FilePath: \vue-node-management-system\src\utils\http.js
 */
import axios from 'axios';
// import Qs from 'qs'; // 没用到

// 配置不同的环境进行区分不同的接口地址
// 生产环境
// if (process.env.NODE_ENV == 'production') {
//   axios.defaults.baseUrl = 'http://192.168.1.90:8081'
//   break
// }
// // 测试环境
// else if (process.env.NODE_ENV == 'test') {
//   axios.defaults.baseUrl = 'http://192.168.1.90:8081'
//   break
// }
// // 开发环境
// else {
//   axios.defaults.baseUrl = 'http://192.168.1.90:8081'
//   break
// }

// // 发送请求：X-www-form-urlencode
// // 当发送post请求的时候，后台要的是这种格式的数据，前端将对象转换为这个格式
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencode'
// // Qs就是将某个对象变成
// axios.defaults.transformRequest = data => Qs.stringify(data)
//-------------------------------------------

import { Notification } from "element-ui";
import store from "@store";
import { getToken } from "@utils/getToken";

// 创建 axios 实例
const http = axios.create({
  // 定义接口的基本路径（非必须），这个只是对一个项目里面的，如果所有接口均调用同一个域名下的不同接口的时候用着方便。
  // baseURL: 'http://xxx.xxx.x.xxx:8080', // api的base_url
  // baseURL: process.env.BASE_URL, // url = base url + request url
  timeout: 5000, // request timeout，设置超时时间和跨域是否允许跨域携带凭证
  // 携带cookie 在axios创建时要加入withCredentials: true，默认withCredentials：false，是不会携带cookie的
  // 设置Cros跨域可以携带cookie。不然在跨域的情况下无法携带cookie
  // withCredentials: true,
})

// 请求拦截器
// http request 拦截器 一般用来在请求前，加一些全局的配置 或 开启一些css的加载动画
http.interceptors.request.use(function(config) {
  // 在发送请求之前，获取登录用户token
  if (store.getters.token) {
  // 判断是否存在token，如果存在的话，则每个http header都加上token。（让每个请求的header携带token-- ['X-Token']为自定义key 请根据实际情况自行修改）
    config.headers['Access-Token'] = getToken();
  }

  // if (config.method=='post'){
  //   config.data = Qs.stringify(config.data); // Qs.stringify()将对象 序列化成URL的形式，以&进行拼接。处理之后的params再去发送请求时 。这时候传递的参数会以bankName=''&bankNameAll=''的形式传递到后台
  //   axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';      //配置post的请求头
  //   config.headers = {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   }
  // }
  return config;
}, function(error) {
  console.log(error); // 对请求错误做些什么
  return Promise.reject(error);
});

// 响应拦截器
// http response 拦截器 一般用来根据一些后端协议特殊返回值做一些处理，例如：权限方面、404... 或关闭一些 css 加载动画
http.interceptors.response.use((response) => {
  // 响应成功
  const res = response.data;
  /**
   * res.code的返回值，由前后端统一定义
   * code：0 请求成功，返回success信息；
   * code：* 请求成功，返回其它信息；
   * code: 2 服务器返回：请求的数据有问题、数据处理有问题
   */
  if (res.code * 1 !== 0) {
    console.log('响应拦截器: ', res)
    // this.$notify({
    //   type: 'error',
    //   title: res.code,
    //   message: res.message || 'Other',
    //   duration: 0 // 不自动关闭提示信息
    // });
    // sysMsgToast(res, false);
    // 使用promise过程中报Uncaught (in promise)错误，在后面加上.catch((e) => {})，就不会报错了
    return Promise.reject(new Error(res.message || 'Error')).catch((e) => {});
  } else {
    return res; // code：0 成功信息
  }
}, (err) => {
  // 响应失败，捕获异常
  if (err && err.response) {
    // do something 这里的处理方式，需要要和后端统一约定好再进一步晚上处理方式
    switch (err.response.status) {
      case 401: // 登录失效逻辑
        store.dispatch('user/resetToken').then(() => {
          location.reload();
        });
        break;
      default: err.message = `连接错误${err.response.status}`;
    }
  } else {
    err.message = '连接到服务器失败';
    // 服务器没有响应。1 服务器崩了。2 客户端断网了
    if (!window.navigator.onLine) {
      // 客户端断网了，可以跳转到一个断网页面
    }
  }
  if (err.message) {
    // this.$notify({
    //   type: 'error',
    //   title: err.code || 'Error',
    //   message: err.message || 'Error',
    //   duration: 0 // 不自动关闭提示信息
    // });
    Notification.error({
      title: err.code || "Error",
      message: err.message || "Error",
    });
    return Promise.reject(err);
  }
});

// post请求 -- 没用上，封装之后反而无法正常发送post方式
// const post = function (url, params) {
//   /**
//    * Axios的POST请求
//    * 在做 post 请求的时候，传参方式是 data: {...} 或者直接 {...} ，
//    * 请求的  Content-Type:application/json;charset=UTF-8 ,
//    * 因为 axios已经自动帮我们 转换请求数据和响应数据 以及 自动转换 JSON 数据。
//    * 重点是，触发了 axios源码 中的：
//    * if(utils.isObject(data)){
//    *   setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
//    *   return JSON.stringify(data);
//    * }
//    * 总结就是：axios 使用 post 发送数据时，默认是直接把 json 放到请求体中提交到后端的。
//    */

/**
 * 如果参数中含有数组，可以给Qs.stringify第二个参数处理数组格式：
 * Qs.stringify({ids: [1, 2, 3]}, { indices: false }) //形式： ids=1&ids=2&id=3
 * Qs.stringify({ids: [1, 2, 3]}, {arrayFormat: ‘indices‘}) //形式： ids[0]=1&ids[1]=2&ids[2]=3
 * Qs.stringify({ids: [1, 2, 3]}, {arrayFormat: ‘brackets‘}) //形式：ids[]=1&ids[]=2&ids[]=3
 * Qs.stringify({ids: [1, 2, 3]}, {arrayFormat: ‘repeat‘}) //形式： ids=1&ids=2&id=3
 */
//   return new Promise((resolve, reject) => {
//     instance({
//       url: url,
//       method: 'post',
//       headers:{'Content-Type':'application/x-www-form-urlencoded'},
//       params: Qs.stringify(params)
//     }).then(res=> {
//       resolve(res);
//     }).catch(error => {
//       reject(error);
//     })
//   });
// }

// get请求
// const get = function (url, params) {
//   return new Promise((resolve, reject) => {
//     instance({
//       url: url,
//       method: 'get',
//       params: params
//     }).then(res=> {
//       resolve(res);
//     }).catch(error => {
//       reject(error);
//     })
//   });
// }
// 暴露post、get方法
export default http;
