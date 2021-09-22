/*
 * @Descripttion: 普通用户平台，路由出口
 * @Author: Irene.Z
 * @Date: 2021-09-22 00:38:52
 * @LastEditTime: 2021-09-22 00:47:54
 * @FilePath: \vue-node-management-system\src\router\front\index.js
 */

// import Layout from "@layout"; // 侧边栏导航
import userManage from "./userManage";

export default {
  path: "/front",
  name: "FrontUserManagement",
  // component: Layout,
  alwaysShow: true,
  redirect: { name: "FrontIndex" }, // 重定向页面，普通用户平台的首页
  meta: { title: "用户管理中心", icon: "nav_icon_marketing"},
  children: [userManage]
};