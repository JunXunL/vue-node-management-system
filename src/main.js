/*
 * @Descripttion:
 * @Author: Irene.Z
 * @Date: 2020-10-14 16:53:54
 * @LastEditTime: 2021-09-22 00:07:59
 * @FilePath: \vue-node-management-system\src\main.js
 */
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import Env from "@constants/env"; // 引入env.js全局配置文件，无论开发环境还是生成环境都会加载
// import http from '@utils/http';
import "@router/permission"; // 权限控制，利用全局前置守卫来进行路由进行控制
// import vueAsyncClick from "vue-async-click";
import permission from "@directive/permission/"; // 自定义指令，权限判断指令
// import mixins from "@utils/mixins"; // 混入公共方法

// import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import "@styles/global.scss"; // 全局基础样式表
// import "@/styles/base.css";
// import "@/styles/iconfont.css";

// vueAsyncClick.install(Vue);

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// Vue.use(*) 使用原理等同于 Vue.prototype.*

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI);

// Vue.mixin(mixins);

Vue.config.productionTip = false;
Vue.prototype.$imgDomain = Env.imgDomain;
// Vue.prototype.$http = http;

Vue.use(permission); // 注册全局指令，权限判断指令

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
