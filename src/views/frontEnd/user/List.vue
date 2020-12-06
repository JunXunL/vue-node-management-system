<!--
 * @Descripttion: 
 * @Author: Irene.Z
 * @Date: 2020-11-02 16:40:23
 * @LastEditTime: 2020-11-30 23:27:59
 * @FilePath: \vue-node-management-system\src\views\frontEnd\user\List.vue
-->
<template>
  <el-container>
    <el-main>
      <p>用户列表</p>
      {{tableData}}
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  created() {
    console.log("user list router:  ", this.$router)
  },
  mounted() {
    this.getInitData();
  },
  methods: {
    getInitData() {
      this.$axios({
        url: "/api/user/get",
        method: "post",
        params: {}
      }).then(res => {
        console.log("前端用户列表：", res)
        if (res.data.status == "1") {
          this.tableData = res.data.content;
          console.log(this.tableData);
        }
      });
    }
  }
}
</script>

<style scoped>
</style>
