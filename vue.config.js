/*
 * @Descripttion:
 * @Author: Irene.Z
 * @Date: 2020-10-27 16:21:22
 * @LastEditTime: 2020-12-15 00:19:14
 * @FilePath: \vue-node-management-system\vue.config.js
 */
const path = require("path");
const env = process.env.npm_config_env; // process.env属性返回的是一个包含用户环境信息的对象，可以区分开发环境或正式环境的依据
let nodeServer = "http://localhost:3000";
if (env === "product") {
  nodeServer = "http://localhost:3333";
} else {
  nodeServer = "http://localhost:3000";
}
module.exports = {
  configureWebpack: config => {
    // 目录引用简写
    const srcDir = path.resolve(__dirname, "src");
    const aliasExt = {
      // @ 是 src/ 的别名
      "@views": path.resolve(srcDir, "views"), // views 文件夹
      "@assets": path.resolve(srcDir, "assets"),
      "@components": path.resolve(srcDir, "components"),
      "@constants": path.resolve(srcDir, "constants"),
      "@store": path.resolve(srcDir, "store"),
      "@utils": path.resolve(srcDir, "utils")
    };
    Object.assign(config.resolve.alias, aliasExt);
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置
    } else {
      // 为开发环境修改配置
    }
  },
  devServer: {
    open: true, // 是否自动启动浏览器
    hot: true, // 保存后自动刷新浏览器，要配合host: 'localhost',port: 8080,
    host: "localhost",
    port: 8080,
    proxy: {
      "/api": {
        target: nodeServer, // nodejs服务器地址
        changeOrigin: true, // 是否允许跨越
        pathRewrite: {
          // 重写，用/api代替target值，如'/api/user/add'
          "^/api": ""
        }
      }
    }
  }
};
