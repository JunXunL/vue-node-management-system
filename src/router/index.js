/*
 * ../Descripttion: 
 * ../Author: Irene.Z
 * ../Date: 2020-10-14 16:53:54
 * @LastEditTime: 2020-12-06 17:22:15
 * @FilePath: \vue-node-management-system\src\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    // 嵌套路由
    children: [
      {
        path: "/1", // 这里不设置值，是把main作为默认页面
        name: "FrontEnd",
        component: () => import("../views/frontEnd/Index.vue"), // 需要<router-view>路由组件，二级
        children: [
          {
            path: "1-1",
            name: "1-1",
            component: () => import("../views/frontEnd/bar/NavEdit.vue")
          },
          {
            path: "/1/1-2",
            name: "1-2",
            component: () => import("../views/frontEnd/bar/NavList.vue")
          },
          {
            path: "/1/1-3",
            name: "1-3",
            component: () => import("../views/frontEnd/bar/TabEdit.vue")
          },
          {
            path: "1-4",
            name: "1-4",
            component: () => import("../views/frontEnd/bar/Index.vue"),  // 需要<router-view>路由组件，三级
            children: [
              {
                path: "1-4-1",
                name: "1-4-1",
                component: () => import("../views/frontEnd/bar/TabList.vue")
              }
            ]
          }
        ]
      },
      {
        path: "/2", // 这里不设置值，是把main作为默认页面
        name: "2",
        component: () => import("../views/frontEnd/user/Edit.vue")
      },
      {
        path: "/3",
        name: "About",
        component: () => import("../views/About.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
