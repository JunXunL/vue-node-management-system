/*
 * @Descripttion: 普通用户平台，路由出口
 * @Author: Irene.Z
 * @Date: 2021-09-22 00:38:52
 * @LastEditTime: 2021-11-25 02:49:19
 * @FilePath: \vue-node-management-system\src\router\front\index.js
 */

// import Layout from "@layout"; // 侧边栏导航
import userManage from "./userManage";

export default {
  path: "/front",
  name: "FrontUserManagement",
  // component: Layout,
  alwaysShow: true, // 左侧菜单栏父级是否一直显示，因为存在单条子路由会隐藏父级菜单
  redirect: { name: "FrontIndex" }, // 重定向页面，普通用户平台的首页
  meta: { title: "用户管理中心", icon: "nav_icon_marketing" },
  children: [userManage]
}
