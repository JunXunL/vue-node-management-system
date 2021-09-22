/*
 * @Descripttion: 普通用户平台，普通用户个人中心
 * @Author: Irene.Z
 * @Date: 2021-09-22 00:27:44
 * @LastEditTime: 2021-09-22 00:39:23
 * @FilePath: \vue-node-management-system\src\router\front\userManage.js
 */
export default {
  // path: "/fuser",
  path: "fuser",
  name: "FUser",
  // component: () => import("@views/frontEnd/user/Index.vue"),
  noComponent: true,
  children: [
    {
      // path: "list",
      path: "index",
      name: "Index",
      component: () => import("@views/frontEnd/user/index"),
      meta: { title: "用户中心" }
    },
    {
      path: "edit/:creator",
      name: "Edit",
      component: () => import("@views/frontEnd/user/edit"),
      meta: {
        title: "修改个人信息",
        activeMenu: "/frontEnd/user/index"
      }
    },
    // {
    //   path: "detail",
    //   name: "Detail",
    //   component: () => import("@views/frontEnd/user/detail")
    // }
  ]
};