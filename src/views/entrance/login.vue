<!--
 * @Descripttion: 登录
 * @Author: Irene.Z
 * @Date: 2020-12-07 16:30:43
 * @LastEditTime: 2021-02-14 00:57:06
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
      ruleForm: {
        account: '',
        pass: ''
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('api/user/get', this.ruleForm).then(res => {
            console.log('login res', res)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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