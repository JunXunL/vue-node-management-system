/*
 * @Descripttion:  VUEX状态管理
 * @Author: Irene.Z
 * @Date: 2020-10-14 16:53:54
 * @LastEditTime: 2021-02-25 17:46:26
 * @FilePath: \vue-node-management-system\src\store\index.js
 * vuex可以进行全局的状态管理，但刷新后刷新后数据会消失
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {}
});
