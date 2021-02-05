/*
 * @Descripttion: 
 * @Author: Irene.Z
 * @Date: 2020-10-14 16:53:54
 * @LastEditTime: 2021-01-18 17:12:06
 * @FilePath: \vue-node-management-system\src\main.js
 */
import Vue from "vue";
import router from "./router";
import store from "./store";
import Env from "@constants/env"; // 引入env.js全局配置文件，无论开发环境还是生成环境都会加载
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import http from '@utils/http';


Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$imgDomain = Env.imgDomain;
Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
