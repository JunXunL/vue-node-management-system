/*
 * @Descripttion: 
 * @Author: Irene.Z
 * @Date: 2021-02-16 03:09:30
 * @LastEditTime: 2021-02-16 03:10:08
 * @FilePath: \vue-node-management-system\src\constants\env.js
 */
const ENV = window.ENV;
const api = {
  pd: {
    // 生产环境
    server: 'http://localhost:3333',
    imgDomain: 'http://localhost:3333'
  },
  dp: {
    // 开发环境
    server: 'http://localhost:3000',
    imgDomain: 'http://localhost:3000'
  }
};
if (window.localStorage.getItem('server') == 'pd') {
  // api.product.server = ''; // 设置生产环境服务器地址，等等操作
} else {
  // 其它情况
}
export default {
  server: api[ENV].server, // 网关服务器地址
  imgDomain: api[ENV].imgDomain // 图片域名
};
