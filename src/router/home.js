/*
 * @Descripttion: 登录后的首页
 * @Author: Irene.Z
 * @Date: 2021-09-22 00:58:59
 * @LastEditTime: 2021-11-25 02:47:37
 * @FilePath: \vue-node-management-system\src\router\home.js
 */

// import Layout from "@/layout";

export default {
  path: "/",
  // component: Layout,
  meta: { title: "概况", icon: "dashboard" },
  redirect: "/home",
  children: [
    {
      path: "home",
      name: "Home",
      component: () => import("@views/Home"),
      meta: { title: "概况", icon: "dashboard" },
    },
  ],
}
