/*
 * @Descripttion: 用户的状态管理
 * @Author: Irene.Z
 * @Date: 2020-10-14 16:53:54
 * @LastEditTime: 2021-09-22 00:25:09
 * @FilePath: \vue-node-management-system\src\store\modules\user_info.js
 * vuex可以进行全局的状态管理，但刷新后刷新后数据会消失
 */
import store from "@store";
import router from "@router";
import { resetRouter } from "@router"; // 路由入口
import { login, logout, getUserInfo, validCreatorSwitch } from "@api/user";
import { getToken, setToken, removeToken } from "@utils/getToken";
// import { getSelectOptions } from "@api/activityManagement";
import { SOME_MUTATION } from '../mutation-types';

const getDefaultState = () => {
  return {
    token: getToken(),
    userId: "",
    userName: "",
    department: "",
    job: "",
    roleName: "",
    roleId: "",
    createTime: "",
    isActive: null,
    isDelete: null,
    isEditSelf: false, // 是否更新用户角色
    isHasEditValid: false, // 是否开启编辑按钮权限校验
    activityTime: null, // 活动时间
    unitList: [], //单位list
    avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
  };
};

const state = getDefaultState();

const mutations = {
  [SOME_MUTATION](state) {
  // 使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USERINFO: (state, info) => {
    state.userId = info.userId;
    state.userName = info.userName;
    state.department = info.department;
    state.job = info.job;
    state.roleName = info.roleName;
    state.roleId = info.roleId;
    state.createTime = info.createTime;
    state.isActive = info.isActive;
    state.isDelete = info.isDelete;
    info.avatar ? (state.avatar = info.avatar) : "";
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ISEDITSELF: (state, isSelf) => {
    state.isEditSelf = isSelf;
  },
  SET_ISHASEDITVALID: (state, isHasEditValid) => {
    state.isHasEditValid = isHasEditValid;
  },
  SET_TIME: (state, time) => {
    state.activityTime = time;
  },
  SET_UNITLIST: (state, time) => {
    state.unitList = time;
  },
};

const actions = {
  login({ commit }, userInfo) {
    console.log("login userInfo: ", userInfo);
    const { account, password, security } = userInfo;
    return new Promise((resolve, reject) => {
      login({ account: account, password: password, security: security })
        .then((response) => {
          console.log('login response', response);
          if (response && response.message === 'success') {
            const { content } = response;
            // let token = content.tokenHead + content.token;
            let token = content.token;
            // 保存token: localStorage、vuex
            // window.localStorage.setItem('vue_node_managesys_user_token', res.content.token);
            commit("SET_TOKEN", token); // 保存到vuex
            setToken('', token); // 保存到cookie中
            // setToken('', token); // 保存到cookie中
            resolve();
          } else {
            reject(error);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
    getUserInfo(state.token)
        .then((response) => {
          const { content } = response;

          if (!content) {
            return reject("Verification failed, please Login again.");
          }

          commit("SET_USERINFO", content);
          setTimeout(() => {
            router.addRoutes(store.state.permission.addRoutes);
          }, 400);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ dispatch, commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit("RESET_STATE");
          dispatch("tagsView/delAllViews", null, { root: true });
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },

  // 获取是否要开启编辑按钮权限校验
  getValidCreatorSwitch({ commit }) {
    validCreatorSwitch().then((res) => {
      commit("SET_ISHASEDITVALID", res.data);
    });
  },

  getUnitList({ commit }) {
    // getSelectOptions("unit").then((res) => {
    //   commit("SET_UNITLIST", res.data);
    // });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};