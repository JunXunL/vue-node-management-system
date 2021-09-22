## vue-node-management-system项目简介
> 这是一个极简的 vue admin 管理后台。它只包含了 Element UI & axios & iconfont & permission control & lint，这些搭建后台必要的东西。
> 另有nodeServer为后端服务。管理snack-bar-h5、domyself 和 myvue 项目使用到的资源。

## 借鉴与参考项目
[线上地址](http://panjiachen.github.io/vue-admin-template)

[国内访问](https://panjiachen.gitee.io/vue-admin-template)

目前版本为 `v4.0+` 基于 `vue-cli` 进行构建，若你想使用旧版本，可以切换分支到[tag/3.11.0](https://github.com/PanJiaChen/vue-admin-template/tree/tag/3.11.0)，它不依赖 `vue-cli`。

## Extra

如果你想要根据用户角色来动态生成侧边栏和 router，你可以使用该分支[permission-control](https://github.com/PanJiaChen/vue-admin-template/tree/permission-control)

## 相关项目

- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

- [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)

- [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template)

- [awesome-project](https://github.com/PanJiaChen/vue-element-admin/issues/2312)

写了一个系列的教程配套文章，如何从零构建后一个完整的后台项目:

- [手摸手，带你用 vue 撸后台 系列一(基础篇)](https://juejin.im/post/59097cd7a22b9d0065fb61d2)
- [手摸手，带你用 vue 撸后台 系列二(登录权限篇)](https://juejin.im/post/591aa14f570c35006961acac)
- [手摸手，带你用 vue 撸后台 系列三 (实战篇)](https://juejin.im/post/593121aa0ce4630057f70d35)
- [手摸手，带你用 vue 撸后台 系列四(vueAdmin 一个极简的后台基础模板,专门针对本项目的文章,算作是一篇文档)](https://juejin.im/post/595b4d776fb9a06bbe7dba56)
- [手摸手，带你封装一个 vue component](https://segmentfault.com/a/1190000009090836)

## Build Setup

```bash
# 克隆项目
git clone https://github.com/PanJiaChen/vue-admin-template.git

# 进入项目目录
cd vue-admin-template

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

更多信息请参考 [使用文档](https://panjiachen.github.io/vue-element-admin-site/zh/)

## 目录结构

本项目已经为你生成了一个完整的开发框架，提供了涵盖中后台开发的各类功能和坑位，下面是整个项目的目录结构。

```bash
├── build                      # 构建相关
├── mock                       # 项目mock 模拟数据
├── plop-templates             # 基本模板
├── json                       # 模板json数据
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── directive              # 全局指令
│   ├── filters                # 全局 filter
│   ├── icons                  # 项目所有 svg icons
│   ├── lang                   # 国际化 language
│   ├── layout                 # 全局 layout
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── vendor                 # 公用vendor
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   └── permission.js          # 权限管理
├── tests                      # 测试
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置项
├── .babelrc                   # babel-loader 配置
├── .travis.yml                # 自动化CI配置
├── vue.config.js              # vue-cli 配置
├── postcss.config.js          # postcss 配置
└── package.json               # package.json
```

## 三级路由

虚拟三级，实际二级路由。对配置二级（虚拟）路由添加noCompoent: true,通过算法遍历的形式，把三级（概念上的）转化为二级（真实）。这样一来，父路由配置要放在真实的父路由上。

```
import Layout from "@/layout";

export default {
  path: "/marketingCore",
  component: Layout,
  alwaysShow: true, // 左侧菜单栏父级是否一直显示，因为存在单条子路由会隐藏父级菜单
  redirect: { name: "ActivityManagement" },
  name: "marketingCore",
  meta: { title: "营销中心", icon: "nav_icon_marketing" },
  isDev:true, // 开发阶段屏蔽权限路由标识，开发完成后须删除！！！！！
  children: [
    {
      path: "activityManagement",
      name: "SubView",
      noCompoent: true, // 二级（虚拟）路由标识
      children: [
        {
          path: "index",
          name: "ActivityManagement",
          component: () =>
            import("@/views/marketingCore/activityManagement/index"),
          meta: { title: "活动管理", icon: "" },
        },
        {
          path: "createActivity",
          name: "createActivity",
          hidden: true, // 是否在左侧菜单栏隐藏，
          component: () => import("@/views/marketingCore/createActivity/index"),
          meta: { 
              title: "创建活动",
              icon: "",
              activeMenu:'/marketingCore/activityManagement/index' // 在当前路由激活高亮的左侧菜单路径
          },
        },
        {
          path: "editActivity/:id",
          name: "editActivity",
          hidden: true,// 是否在左侧菜单栏隐藏，
          component: () => import("@/views/marketingCore/editActivity/index"),
          meta: { 
              title: "编辑活动",
              icon: "",
              activeMenu:'/marketingCore/activityManagement/index'
          },
        },
      ],
    },
  ],
};

```



## **页面缓存**

实现页面缓存方式：

vue文件的name和路由的name一致，即可实现keep-alive的缓存方式。注：vue文件的name必须采用大驼峰写法规范。

```
// 404.vue
<template>
  
</template>

<script>
export default {
	name: 'Page404'
}
</script>

<style>

</style>

// router.js
{
    path: "/404",
    name:'Page404',
    component: () => import("@/views/404"),
    hidden: true,
  }
```

若页面不缓存，有两种实现方式：

1、路由配置中meta对象添加属性noCache:true；

2、定义路由的name和vue文件的name不一致。

## 接口匹配动态路由

router中，将动态路由存放在asyncRoutes中，通过接口匹配需要显示的路由

```
router/index.js
// 动态路由
export const asyncRoutes = [marketingCore, systemSettings].map((item) => {
  return delteFakeParent(item);
});
```

## 销毁当前标签页
打开过的页面会作为标签的形式存储在vuex里，如果要销毁当前页面的tag，使用如下方法：

```
this.$store.dispatch("tagsView/delView", this.$route);
```

## 异步点击事件指令

使用v-asyncClick指令，执行异步点击事件，防止异步事件多次执行

```
要求传入一个对象：
{
	event, // 事件
	params // 事件需要传入的参数数组（顺序传入），没有则不传
}

<el-button v-asyncClick="{event:handleLogin,params:[]}">
  登录
</el-button>
```



## 公共样式属性

dialog上下左右垂直居中：custom-class="dialog-common" 

```
<el-dialog
      title="选择活动"
      :visible.sync="isCheckActivity"
      width="30%"
      center
      custom-class="dialog-common"
    />
```
## 按钮级别权限校验
使用自定义指令v-permission="['admin','editor']",传入当前按钮可操作的权限
编辑删除按钮等需要校验当前用户是否为创建人时
请按照v-permission="{roles:['OP:OPERATING_CENTER_NAVIGATION_UPDATE_SUPER'],creator:'当前创建人'}"
roles：按钮权限  creator：当前创建人id（动态获取）
表格前面的选择框能否勾选，使用mixins中的isCanCheck方法判断

## 公共组件

### 图片(视频)上传

路径：src\components\createActivity\UploadImg\index.vue

#### UploadImg Attributes

| 参数           | 说明                                                   | 类型             | 可选值 | 默认值      |
| -------------- | ------------------------------------------------------ | ---------------- | ------ | ----------- |
| accept         | 图片上传接受格式                                       | String           | -      | ".png,.jpg" |
| multiple       | 是否多选                                               | Boolean          | true   | false       |
| limit          | 上传限制数量                                           | Number           | -      | 1           |
| limitSize      | 图片文件限制大小（单位M）                              | Number           | -      | 10          |
| videoLimitSize | 视频文件限制大小（单位M）                              | Number           | -      | 40          |
| startTime      | 传入活动开始时间（时间戳作为文件夹名称）               | String           | -      | ""          |
| endTime        | 传入活动结束时间（时间戳作为文件夹名称）               | String           | -      | ""          |
| dirName        | 文件夹名称，如果页面没有开始时间和结束时间，此字段必传 | [String, Number] | -      | ""          |
| fileType       | 文件上传oss类型（必传）                                | [String, Number] | -      | ""          |
| isEdit         | 是否编辑状态                                           | Boolean          | true   | false       |

#### UploadImg Events

| 事件名称  | 说明                                                         | 回调参数                       |
| --------- | ------------------------------------------------------------ | ------------------------------ |
| onSuccess | 上传(编辑、删除)成功暴露onSuccess函数钩子，用于接收文件数组[{name:xx,url:xxx}] | Function(props: array)         |
| change    | 上传(编辑、删除)成功暴露change函数钩子,可配合v-model使用。格式：单条文件(limit===1)"http://xxxx.png",多个文件["http://xxxx.png","http://xxxx.jpg"] | Function(props: array\|string) |

#### Example

```vue
<uploadImg v-model="url" :limit="3" @onSuccess="onSuccess" dirName="dirName" :fileType="20"></uploadImg>
<script>
    export default {
        data(){
          return{
              url:""
          }  
        },
        methods:{
            onSuccess(arr){
                console.log(arr)//[{name:xx,url:xxx}]
            }
        }
    }
</script>
```

### 渠道图片上传

路径：src\components\createActivity\UploadImg\uploadImg-channels.vue

#### UploadImg-channels Attributes

| 参数        | 说明                                                         | 类型             | 可选值   | 默认值                                       |
| ----------- | ------------------------------------------------------------ | ---------------- | -------- | -------------------------------------------- |
| channel     | 传入的渠道                                                   | Array            | ["H5","MINI"] | []                                           |
| data        | 传入的数据                                                   | Object           | -        | {"PCUrl": [],"MobileUrl": [],"fileType": ""} |
| pcKey       | 传入数据参数名不为MobileUrl时可通过传入配置参数名,保证复用性 | String           | -        | "PCUrl"                                      |
| mobileKey   | 传入数据参数名不为PCUrl时可通过传入配置参数名,保证复用性     | String           | -        | "MobileUrl"                                  |
| labelPc     | PC端描述文字                                                 | String           | -        | 不超过10M；支持.png；尺寸210*210             |
| labelMobile | Mobile端描述文字                                             | String           | -        | 不超过10M；支持.png；尺寸210*210             |
| direction   | 样式布局方向（横向、竖向）                                   | String           | "column" | "row"                                        |
| accept      | 图片上传接受格式                                             | String           | -        | ".png,.jpg"                                  |
| limitSize   | 图片文件限制大小（单位M）                                    | Number           | -        | 10                                           |
| startTime   | 传入活动开始时间（时间戳作为文件夹名称）                     | String           | -        | ""                                           |
| endTime     | 传入活动结束时间（时间戳作为文件夹名称）                     | String           | -        | ""                                           |
| dirName     | 文件夹名称，如果页面没有开始时间和结束时间，此字段必传       | [String, Number] | -        | ""                                           |
| fileType    | 文件上传oss类型（必传）                                      | [String, Number] | -        | ""                                           |
| isEdit      | 是否编辑状态                                                 | Boolean          | true     | false                                        |

#### Example

```vue
<template>
  <div>
      <el-form :model="form" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="渠道" prop="channel">
            <el-checkbox-group v-model="form.channel">
                <el-checkbox label="H5">云购h5</el-checkbox>
                <el-checkbox label="MINI">云购mini</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
          <el-form-item label="图片" prop="btnImgUrl">
            <uploadImgChannels
                    direction="column"
                    :data="form.btnImgUrl"
                    :channel="form.channel"
                    :dir-name="123123123"
                    :fileType="form.btnImgUrl.fileType"
                />
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import uploadImgChannels from "@com/createActivity/UploadImg/uploadImg-channels";
export default {
    components: {
    uploadImgChannels
  },
    data(){
        return{
            form:{
                channel:[],
                "btnImgUrl": {
                    "PCUrl": [],
                    "MobileUrl": [],
                    "fileType": 20
                }
            }
        }
    }
}
</script>
```



## 购买贴纸

你也可以通过 购买[官方授权的贴纸](https://smallsticker.com/product/vue-element-admin) 的方式来支持 vue-element-admin - 每售出一张贴纸，我们将获得 2 元的捐赠。

## Demo

![demo](https://github.com/PanJiaChen/PanJiaChen.github.io/blob/master/images/demo.gif)

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

## License

[MIT](https://github.com/PanJiaChen/vue-admin-template/blob/master/LICENSE) license.

Copyright (c) 2017-present PanJiaChen



