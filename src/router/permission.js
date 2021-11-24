/*
 * @Descripttion: 利用全局前置守卫来进行路由控制
 * @Author: Irene.Z
 * @Date: 2021-09-21 22:49:05
 * @LastEditTime: 2021-11-25 02:48:53
 * @FilePath: \vue-node-management-system\src\router\permission.js
 */
import router from "../router"; // index.js
import store from "../store";
import { getToken } from "@utils/getToken";
import { getPageTitle } from "@utils/common";
import { Message } from "element-ui";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

const whileRouteList = ["/login", "/register", "/404"];

// 在router.beforeEach()中嵌套async
// 利用全局前置守卫来进行路由控制，判断是否登录，没登录去登录页，登陆了就判断是否添加了路由列表，然后继续跳转
router.beforeEach(async(to, from, next) => {
  NProgress.start(); // 浏览器顶部的进度条 -- 开始

  document.title = getPageTitle(to.meta.title); // 设置页面标题

  const isAuthenticated = getToken(); // 判断Cookie中是否有token

  /**
   * to.name：即将要进入的目标 路由对象（Route）的名称；【也可以用to.path !== "/login"】
   * from：当前导航正要离开的路由；
   * 进入的不是login页，且没有认证信息 => 进入登录页Login页；
   * to.meta.requireAuth，判断即将要进入的路由，是否需要登录的权限
   * next()是进入下一个管道，next()一定要执行，否则将出现页面留白的现象。
   */
  if (isAuthenticated) {
    // 有token
    // if (store.getters.routes.length === 0) {
    //   // 获取用户权限
    //   await store.dispatch("permission/authenticateUser");
    // }
    if (whileRouteList.includes(to.path)) {
      next();
      // next({path: to.path});
      NProgress.done();
    } else {
      const getUserInfo = store.getters.getUserInfo;
      console.log("user info :", store.getters);
      if (getUserInfo && getUserInfo.userId) {
        next();
      } else {
        try {
          // 获取登录的用户信息
          await store.dispatch("userInfo/getInfo");
          next();
        } catch (error) {
          await store.dispatch("userInfo/resetToken");
          Message.error(error || "未获得登录用户信息，请重新登录。");
          // next(`/login?redirect=${to.path}`);
          next({
            path: "/login", // 没有token就跳转登录页面
            query: {
              redirect: to.fullPath // 需要重定向的路由，在/login这个组件中跳转页面
            }
          });
          NProgress.done();
        }
      }
    }
  } else {
    // 没有token
    if (whileRouteList.includes(to.path)) {
      next();
      NProgress.done();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // 浏览器顶部的进度条 -- 结束
  NProgress.done();
});
