/*
 * @Descripttion: 全局设置
 * @Author: Irene.Z
 * @Date: 2021-09-21 23:25:52
 * @LastEditTime: 2021-11-25 02:55:21
 * @FilePath: \vue-node-management-system\src\utils\setting.js
 */

module.exports = {
  title: "Customized management system", // 量身定制管理系统（前后两端）
  fixedHeader: true, // 系统页面头部，是否铺满
  sidebarLogo: true, // 侧边导航栏，是否显示logo
  tagsView: true, // 打开过的页面会作为标签的形式存储在vuex里，保证刷新不丢失当前页面。如果要销毁当前页面的tag，使用如下方法：this.$store.dispatch("tagsView/delView", this.$route);
}
