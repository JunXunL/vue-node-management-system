/*
 * @Descripttion:
 * @Author: Irene.Z
 * @Date: 2020-10-14 16:53:54
 * @LastEditTime: 2020-12-15 00:39:45
 * @FilePath: \vue-node-management-system\src\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@views/Home.vue";
import { getToken } from "@utils/getToken.js"

Vue.use(VueRouter);

// 导航菜单配置
const Bar = {
  path: "/bar", // 这里不设置值，默认页面
  name: "Bar",
  component: () => import("@views/frontEnd/bar/Index.vue"),
  children: [
    {
      path: "nav",
      name: "Nav",
      component: () => import("@views/frontEnd/bar/Main.vue"),
      children: [
        {
          path: "edit",
          name: "Edit",
          component: () => import("@views/frontEnd/bar/NavEdit.vue")
        },
        {
          path: "list",
          name: "List",
          component: () => import("@views/frontEnd/bar/NavList.vue")
        }
      ]
    },
    {
      path: "tab",
      name: "Tab",
      component: () => import("@views/frontEnd/bar/Main.vue"),
      children: [
        {
          path: "edit",
          name: "Edit",
          component: () => import("@views/frontEnd/bar/TabEdit.vue")
        },
        {
          path: "list",
          name: "List",
          component: () => import("@views/frontEnd/bar/TabList.vue")
        }
      ]
    }
  ]
};

// 普通用户
const FUser = {
  path: "/fuser",
  name: "FUser",
  component: () => import("@views/frontEnd/user/Index.vue"),
  children: [
    {
      path: "list",
      name: "List",
      component: () => import("@views/frontEnd/user/List.vue")
    },
    {
      path: "edit",
      name: "Edit",
      component: () => import("@views/frontEnd/user/Edit.vue")
    },
    {
      path: "detail",
      name: "Detail",
      component: () => import("@views/frontEnd/user/Detail.vue")
    }
  ]
};

// 管理员用户
const AUser = {
  path: "/auser",
  name: "AUser",
  component: () => import("@views/afterEnd/user/Index.vue"),
  children: [
    {
      path: "list",
      name: "List",
      component: () => import("@views/afterEnd/user/List.vue")
    },
    {
      path: "edit",
      name: "Edit",
      component: () => import("@views/afterEnd/user/Edit.vue")
    },
    {
      path: "detail",
      name: "Detail",
      component: () => import("@views/afterEnd/user/Detail.vue")
    }
  ]
};

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@views/entrance/login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@views/entrance/register.vue")
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    // 嵌套路由
    children: [
      {
        path: "/frontEnd", // 这里不设置值，是把main作为默认页面
        name: "FrontEnd",
        component: () => import("../views/frontEnd/Index.vue"),
        children: [Bar, FUser]
      },
      {
        path: "/afterEnd", // 这里不设置值，是把main作为默认页面
        name: "AfterEnd",
        component: () => import("../views/afterEnd/Index.vue"),
        children: [AUser]
      },
      {
        path: "/about",
        name: "About",
        component: () => import("../views/About.vue")
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = getToken() ? true : false;
  console.log("-------isAuthenticated---------", isAuthenticated)
  /**
   * to.name：即将要进入的目标 路由对象（Route）的名称；【也可以用to.path !== "/login"】
   * from：当前导航正要离开的路由；
   * 进入的不是login页，且没有认证信息 => 进入登录页Login页；
   */
  if ((to.name !== 'Login') && (to.name !== 'Register') && !isAuthenticated) next({ name: 'Login' })
  else next()
})

export default router;
