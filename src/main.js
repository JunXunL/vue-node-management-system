import Vue from "vue";
import router from "./router";
import store from "./store";
import Env from "@constants/env"; // 引入env.js全局配置文件，无论开发环境还是生成环境都会加载
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import axios from 'axios';
Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$imgDomain = Env.imgDomain;
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
