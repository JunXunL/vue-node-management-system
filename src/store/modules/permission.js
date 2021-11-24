/*
 * @Descriptin:
 * @Version: 0.1
 * @Author: Irene.Z
 * @Date: 2021-10-07 23:26:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-25 02:50:41
 */
import { constantRoutes } from "@router";
// import { authenticateUser } from "@api/user";

const state = {
  routes: [],
  addRoutes: [],
  roles: [],
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = [...constantRoutes, ...routes];
  },
  RESET_ROUTES: (state) => {
    state.addRoutes = [];
    state.routes = [];
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  }
}

const actions = {
  authenticateUser({ commit }) {
    // node服务建立权限和路由表，返回信息

    // return new Promise((resolve, reject) => {
    //   authenticateUser()
    //   .then((response) => {
    //     const { data } = response;
    //     let rolesList = [];
    //     // 按照左侧菜单依次遍历
    //     data.map((item) => {
    //       if (item.permValue) rolesList.push(item.permValue);
    //       item.subPermission.map((subItem) => {
    //         if (subItem.permValue) rolesList.push(subItem.permValue);
    //         subItem.buttonPermissionList.map((butIetm) => {
    //           if (butIetm.permValue) rolesList.push(butIetm.permValue);
    //         });
    //       });
    //     });
    //     commit("SET_ROUTES2", data);
    //     commit("SET_ROLES", rolesList);
    //     resolve();
    //   })
    //   .catch((error) => {
    //     reject(error);
    //   });
    // })
    commit("SET_ROUTES", "");
    commit("SET_ROLES", "");
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
