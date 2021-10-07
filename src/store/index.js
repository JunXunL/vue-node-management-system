/*
 * @Descripttion: VUEX状态管理
 * @Author: Irene.Z
 * @Date: 2020-10-14 16:53:54
 * @LastEditTime: 2021-09-22 00:24:38
 * @FilePath: \vue-node-management-system\src\store\index.js
 * vuex可以进行全局的状态管理，但刷新后刷新后数据会消失
 */
import Vue from "vue";
import Vuex from "vuex";
import userInfo from "./modules/user_info";
import permission from "./modules/permission"; // 控制用户权限

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { userInfo, permission }
});
