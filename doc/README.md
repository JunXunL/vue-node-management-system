## 项目构建记录 (https://element.eleme.cn/#/zh-CN/component/quickstart)

### 在项目的根目录安装Element UI
```
npm i element-ui -S
```
### 打开修改/src/main.js文件，引入element-ui
```
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

### 按需引入，借助 babel-plugin-component，可以只引入需要的组件，以达到减小项目体积的目的。
```
npm install babel-plugin-component -D
```
将 .babelrc 修改为：
```
{
  "presets": [...],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```
