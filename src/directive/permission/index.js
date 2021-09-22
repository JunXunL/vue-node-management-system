/*
 * @Descripttion: 注册全局指令，权限控制指令
 * @Author: Irene.Z
 * @Date: 2021-09-22 00:13:38
 * @LastEditTime: 2021-09-22 00:13:39
 * @FilePath: \vue-node-management-system\src\directive\permission\index.js
 */

import permission from "./permission";

const install = function (Vue) {
  Vue.directive("permission", permission);
};

if (window.Vue) {
  window["permission"] = permission;
  Vue.use(install); // eslint-disable-line
}

permission.install = install;
export default permission;