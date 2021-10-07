/*
 * @Descripttion: 全局路由
 * @Author: Irene.Z
 * @Date: 2020-10-14 16:53:54
 * @LastEditTime: 2021-09-22 17:16:22
 * @FilePath: \vue-node-management-system\src\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";
import home from "./home"; // 首页 route
import frontManagement from "./front/index";
import store from "../store";
import { delteFakeParent } from "@utils/common";

Vue.use(VueRouter);

/**
 * Layout
 * import Layout from "@/layout";
 *
 * hidden: true // (默认 false)
 * 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 *
 * redirect: 'noRedirect'
 * 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 *
 * 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 * 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 * 若你想不管路由下面的 children 声明的个数都显示你的根路由
 * 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * alwaysShow: true
 *
 * name: 'router-name' // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta: {
 *   roles: ['admin', 'editor'] // 设置该路由进入的权限，支持多个权限叠加
 *   title: 'title' // 设置该路由在侧边栏和面包屑中展示的名字
 *   icon: 'svg-name' // 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
 *   noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
 *   breadcrumb: false //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
 *   affix: true // 若果设置为true，它则会固定在tags-view中(默认 false)
 *
 *   当路由设置了该属性，则会高亮相对应的侧边栏。
 *   这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
 *   点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
 *    activeMenu: '/article/list'
 * }
 */

// 不需要动态判断权限的路由，所有角色可以任意访问
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/entrance/login"),
    hidden: true,
  },
  {
    path: "/register",
    component: () => import("@/views/entrance/register"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/entrance/404"),
    hidden: true,
  },
  home,
];

const redirectRoute = { path: "*", redirect: "/404", hidden: true };

const createRouter = () =>
  new VueRouter({
    mode: "history", // 需要后端服务支持
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });
const router = createRouter();

// 动态路由
export const asyncRoutes = [
  frontManagement, // 路由模块 -- 普通用户平台
  redirectRoute,
].map((item) => {
  // 遍历数组格式的路由模块
  return delteFakeParent(item);
});

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
  router.options = newRouter.options; // reset router
  store.commit("permission/RESET_ROUTES"); // 判断用户权限展示路由
}

// const routes = [
//   {
//     path: "/login",
//     name: "Login",
//     component: () => import("@views/entrance/login.vue")
//   },
//   {
//     path: "/register",
//     name: "Register",
//     component: () => import("@views/entrance/register.vue")
//   },
//   {
//     path: "/",
//     name: "Home",
//     component: Home,
//     // 嵌套路由
//     children: [
//       {
//         path: "/frontEnd", // 这里不设置值，是把main作为默认页面
//         name: "FrontEnd",
//         component: () => import("../views/frontEnd/Index.vue"),
//         children: [Bar, frontManagement]
//       },
//       {
//         path: "/afterEnd", // 这里不设置值，是把main作为默认页面
//         name: "AfterEnd",
//         component: () => import("../views/afterEnd/Index.vue"),
//         children: [AUser]
//       },
//       {
//         path: "/about",
//         name: "About",
//         component: () => import("../views/About.vue")
//       }
//     ],
//     meta: {
//       requireAuth: true // 在需要访问权限的路由上，加上元信息meta
//     }
//   },
//   {
//     path: "/about",
//     name: "About",
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () =>
//       import(/* webpackChunkName: "about" */ "../views/About.vue")
//   }
// ];

// const router = new VueRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes
// });

// 全局路由级别的权限控制，代码移入permission.js
// router.beforeEach((to, from, next) => {
//   NProgress.start(); // 浏览器顶部的进度条 -- 开始
//   // store.state.token， 判断vuex中是否有token
//   const isAuthenticated = getToken() ? true : false; // 判断Cookie中是否有token

//   /**
//    * to.name：即将要进入的目标 路由对象（Route）的名称；【也可以用to.path !== "/login"】
//    * from：当前导航正要离开的路由；
//    * 进入的不是login页，且没有认证信息 => 进入登录页Login页；
//    * to.meta.requireAuth，判断即将要进入的路由，是否需要登录的权限
//    * next()是进入下一个管道，next()一定要执行，否则将出现页面留白的现象。
//    */
//   if (to.meta.requireAuth) {
//     // (to.name !== 'Login') && (to.name !== 'Register') && !isAuthenticated &&
//     // console.log('store.state.token------', store.state.token)
//     // if (store.state.token) {
//       // 判断，VUEX中有保存token
//     if (isAuthenticated){
//       next()
//     } else {
//       // next({ name: 'Login' })
//       next({
//         path: '/login', // 没有token就跳转登录页面
//         query: {
//           redirect: to.fullPath // 需要重定向的路由，在/login这个组件中跳转页面
//         }
//       })
//     }
//   } else {
//     next() // 不需要登录直接进入页面
//   }
// });
//
// router.afterEach(() => {
//   NProgress.done(); // 浏览器顶部的进度条 -- 结束
// });

export default router;
