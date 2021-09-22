/*
 * @Descripttion: 
 * @Author: Irene.Z
 * @Date: 2021-06-23 20:55:00
 * @LastEditTime: 2021-09-21 16:24:28
 * @FilePath: \vue-node-management-system\src\utils\request.js
 */
// /*
//  * @Descripttion:
//  * @Author: Irene.Z
//  * @Date: 2020-12-17 14:26:45
//  * @LastEditTime: 2020-12-17 14:26:55
//  * @FilePath: \vue-node-management-system\src\utils\request.js
//  */
// import service from "./axios-config";

// class serviceManger {
//     //登录
//     login(username, password) {
//         return new Promise((resolve, reject) => {
//             return service
//                 .post("/user/login", {
//                     username,
//                     password
//                 })
//                 .then(response => {
//                     resolve(response);
//                 })
//                 .catch(error => {
//                     reject(error);
//                 });
//         });
//     }
//     //获取用户信息
//     getInfo(token) {
//         return new Promise((resolve, reject) => {
//             return service({
//                 url: "/user/getInfo",
//                 method: "get",
//                 params: { token }
//             })
//                 .then(response => {
//                     resolve(response);
//                 })
//                 .catch(error => {
//                     reject(error);
//                 });
//         });
//     }
//     //退出登录
//     logout(token) {
//         return new Promise((resolve, reject) => {
//             return service({
//                 url: "/user/logout",
//                 method: "post"
//             })
//                 .then(response => {
//                     resolve(response);
//                 })
//                 .catch(error => {
//                     reject(error);
//                 });
//         });
//     }
// }
// export default new serviceManger();