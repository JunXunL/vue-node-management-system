<!--
 * @Descripttion: 
 * @Author: Irene.Z
 * @Date: 2020-10-14 16:53:54
 * @LastEditTime: 2020-12-06 17:23:31
 * @FilePath: \vue-node-management-system\src\views\Home.vue
-->
<template>
  <el-container id="home">
    <el-header height="100px">header</el-header>
    <!-- 横向（aside 和 main） -->
    <!-- 垂直菜单，可内嵌子菜单。
    通过submenu组件可以生成二级菜单，折叠该分类菜单。
    通过el-menu-item-group组件可以实现菜单进行分组，分组名可以通过title属性直接设定，也可以通过具名 slot 来设定 -->
    <el-container direction="horizontal">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <!-- router是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
        <el-menu
          :default-active="this.$router.path"
          router
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="/1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="/1/1-1">选项1</el-menu-item>
              <el-menu-item index="/1/1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="/1/1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="/1/1-4/1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="/2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="/3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  data() {
    return {
      tableData: []
    };
  },
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
