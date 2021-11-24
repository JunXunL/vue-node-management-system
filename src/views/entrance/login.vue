<!--
 * @Descripttion:登录
 * @Author: Irene.Z
 * @Date: 2020-12-07 16:30:43
 * @LastEditTime: 2021-11-25 02:59:25
 * @FilePath: \vue-node-management-system\src\views\entrance\login.vue
-->
<template>
  <div class="register">
    <div class="contain-box">
      <el-form ref="loginForm" :model="form" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="account">
          <el-input v-model="form.account" />
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input ref="password" v-model="form.pass" type="password" autocomplete="off" />
          <!-- <span class="show-pwd" @click="showPwd" >
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span> -->
        </el-form-item>
        <el-form-item label="验证码" prop="security">
          <el-input v-model="form.security" />
          <el-image ref="captcha" :src="verifiy" fit="contain" style="width: 100px; height: 100px" @click="getCaptcha" @load="verifyLoadState=true">
            <!-- <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div> -->
          </el-image>
        </el-form-item>
        <el-form-item class="btn-box">
          <el-button type="primary" :loading="loading" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
          <router-link :to="{name: 'Register'}" class="register-link">新用户注册</router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import _CryptoJS from "@utils/CryptoJS"
// import { setToken } from '@utils/getToken';
// import { mapGetters, mapState } from 'vuex';
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else {
        // if (this.form.pass !== '') {
        //   this.$refs.loinForm.validateField('pass');
        // }
        callback()
      }
    }
    return {
      verifyLoadState: false,
      verifiy: "/api/svg",
      form: {
        account: "",
        pass: "",
        security: ""
      },
      rules: {
        account: [
          { required: true, message: "请输入手机号或邮箱", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 5 到 20 个字符", trigger: "blur" }
        ],
        pass: [
          { required: true, validator: validatePass, trigger: "blur" }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined // 重定向url
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    // ...mapMutations([
    //   'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

    //   // `mapMutations` 也支持载荷：
    //   'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    // ]),
    // ...mapMutations({
    //   add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    // }),
    showPwd() {
      // 是否明文显示密码
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true; // 显示加载中状态
          const form = {
            account: this.form.account.trim(),
            password: _CryptoJS.encrypt(this.form.pass), // 加密
            security: this.form.security
          }

          this.$store
            .dispatch("userInfo/login", form)
            .then(() => {
              // 登录成功，（1）返回token并保存token，进入平台主页面；（2）可以重定向页面，也可以使用name
              //   this.$router.push({name: 'home'});
              this.$router.push({ path: this.redirect || "/" }); // 重定向
              this.loading = false;
            })
            .catch(() => {
              // 验证出错误时重新更新验证码
              this.getCaptcha();
              this.loading = false;
            })
        } else {
          console.log("error submit!!");
          this.getCaptcha();
          return false
        }
      })
    },
    resetForm(formName) {
      // 重置表单
      this.$refs[formName].resetFields();
    },
    // 获取一个新的图片验证码
    getCaptcha(e) {
      // 每次指定的src要不一样，img才会重新请求，可以使用Date.now()小技巧
      // this.$refs.captcha.src = 'http://localhost:3000/svg?time=' + Date.now()
      if (!this.verifyLoadState) return
      // 防止下一次重复点击
      this.verifyLoadState = false;
      const timeStamp = e ? e.timeStamp : new Date.Now();
      this.verifiy = this.verifiy + "?" + timeStamp;
    }
  }
}
</script>
<style lang="scss" scoped>
  .register {
    .contain-box {
      width: 450px;
      margin: 160px auto 0px;
      padding: 40px 48px 20px 20px;
      border: 2px solid #409eff;
      border-radius: 20px;
      /deep/ .btn-box > .el-form-item__content {
        margin-left: 170px !important;
      }
    }
    .register-link {
      margin-left: 50px;
      color: #e2831b;
      font-style: italic;
    }
  }
</style>
