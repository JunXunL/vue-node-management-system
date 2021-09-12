<!--
 * @Descripttion:登录
 * @Author: Irene.Z
 * @Date: 2020-12-07 16:30:43
 * @LastEditTime: 2021-02-25 17:09:18
 * @FilePath: \vue-node-management-system\src\views\entrance\login.vue
-->
<template>
  <div class="register">
    <div class="contain-box">
      <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="account">
          <el-input v-model="ruleForm.account" />
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="验证码" prop="security">
          <el-input v-model="ruleForm.security" />
          <el-image ref="captcha" :src="verifiy" fit="contain" style="width: 100px; height: 100px" @click="getCaptcha" @load="verifyLoadState=true">
            <!-- <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div> -->
          </el-image>
        </el-form-item>
        <el-form-item class="btn-box">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <router-link :to="{name: 'Register'}" class="register-link">新用户注册</router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import _CryptoJS from '@utils/CryptoJS';
import { setToken } from '@utils/getToken';
import { mapMutations } from 'vuex';
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    return {
      verifyLoadState: false,
      verifiy: '/api/svg',
      ruleForm: {
        account: '',
        pass: '',
        security: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入手机号或邮箱', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ]
      }
    };
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const mysecurity = _CryptoJS.encrypt(this.ruleForm.pass);
          this.ruleForm.pass = mysecurity;
          this.$http.post('api/user/get', this.ruleForm).then(res => {
            console.log('login res', res)
            if (res && res.message === 'success') {
              console.log('res.content.token--------------', res.content.token)
              setToken('', res.content.token); // 保存到cookie中
              // 保存token: localStorage、vuex
              // window.localStorage.setItem('vue_node_managesys_user_token', res.content.token);
              // 验证成功返回值为200进入主页面
              this.$router.push('/');
              // // 登录成功后，可以重定向页面，有以下方式
              // if(this.$route.query.redirect) {
              //   const redirectPath = this.$route.query.redirect;
              //   this.$router.push({path: redirectPath}); // 重定向
              // } else {
              //   this.$router.push({name: 'home'});
              // }
            } else {
              // 验证出错误时重新更新验证码
              this.getCaptcha();
            }
          }).catch(err => {
            console.log('catch----', err);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 获取一个新的图片验证码
    getCaptcha(e) {
      // 每次指定的src要不一样，img才会重新请求，可以使用Date.now()小技巧
      // this.$refs.captcha.src = 'http://localhost:3000/svg?time=' + Date.now()
      if (!this.verifyLoadState) return;
      // 防止下一次重复点击
      this.verifyLoadState = false;
      const base = '/api/svg';
      this.verifiy = base + '?' + e.timeStamp;
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