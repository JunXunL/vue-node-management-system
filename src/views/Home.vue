<!--
 * @Descripttion:
 * @Author: Irene.Z
 * @Date: 2020-10-14 16:53:54
 * @LastEditTime: 2021-09-22 01:01:41
 * @FilePath: \vue-node-management-system\src\views\Home.vue
-->
<template>
  <el-container id="home">
    <el-header height="100px">
      <div>
        <div></div>
        <div>
          <span></span>
        </div>
      </div>
    </el-header>
    <!-- 横向（aside 和 main） -->
    <!-- 垂直菜单，可内嵌子菜单。
    通过submenu组件可以生成二级菜单，折叠该分类菜单。
    通过el-menu-item-group组件可以实现菜单进行分组，分组名可以通过title属性直接设定，也可以通过具名 slot 来设定 -->
    <el-container direction="horizontal">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <!-- router是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
        <el-menu
          router
          :default-active="$route.path"
          :unique-opened="true"
          :default-openeds="['1']"
          mode="vertical"
          background-color="#00305E"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1"><!--一级导航-->
            <template slot="title">
              <i class="el-icon-message"></i>前端系统
            </template>
            <el-menu-item-group title="导航"><!--二级导航-->
              <el-submenu index="/bar/nav"><!--三级导航-->
                <template slot="title">NavBar配置</template>
                <el-menu-item key="/bar/nav/list" index="/bar/nav/list">信息展示</el-menu-item>
                <el-menu-item key="/bar/nav/edit" index="/bar/nav/edit">编辑</el-menu-item>
              </el-submenu>
              <el-submenu index="/bar/tab"><!--三级导航-->
                <template slot="title">Tabbar配置</template>
                <el-menu-item key="/bar/tab/list" index="/bar/tab/list">信息展示</el-menu-item>
                <el-menu-item key="/bar/tab/edit" index="/bar/tab/edit">编辑</el-menu-item>
              </el-submenu>
            </el-menu-item-group>
            <!-- <el-menu-item-group title="广告">
              <el-menu-item index="/about">广告配置</el-menu-item>
            </el-menu-item-group> -->
            <el-menu-item-group>
              <template slot="title">用户</template><!--二级导航-->
              <el-menu-item key="/fuser/list" index="/fuser/list">用户信息</el-menu-item>
              <el-menu-item key="/fuser/edit" index="/fuser/edit">添加用户</el-menu-item>
              <el-menu-item key="/fuser/detail" index="/fuser/detail">修改用户</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="/afterEnd">
            <template slot="title">
              <i class="el-icon-menu"></i>后端系统
            </template>
            <el-menu-item-group title="超级管理员">
              <el-menu-item index="/auser/list">用户信息</el-menu-item>
              <el-menu-item index="/auser/edit">添加用户</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>系统配置
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="/about">About</el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <p>111111111111111</p>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: 'Home',
  data() {
    return {
      tableData: []
    };
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.el-header {
  color: #333;
  background-color: #ffffff;
}
.el-aside {
  color: #333;
}
</style>
