<!--
 * @Descripttion:
 * @Author: Irene.Z
 * @Date: 2020-12-07 16:30:51
 * @LastEditTime: 2021-11-25 02:59:56
 * @FilePath: \vue-node-management-system\src\views\entrance\register.vue
-->
<template>
  <div class="register">
    <div class="contain-box">
      <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleForm.age" />
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :rules="[{required: true, message: '请输入邮箱地址', trigger: 'blur'},{type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}]">
          <el-input v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item class="btn-box">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"))
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass")
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        name: "",
        pass: "",
        checkPass: "",
        age: "",
        email: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        pass: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        age: [
          { validator: checkAge, trigger: "blur" }
        ]
      }

    }
  },
  methods: {
    submitForm(formName) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.5)"
      })
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addUser(this.ruleForm).then(res => {
            console.log("success res", res)
            if (res.success) {
              this.$notify({
                title: "注册成功",
                message: "关闭此提示信息即可进入登录页。",
                type: "success",
                onClose: () => {
                  console.log("00000000000000000000000")
                  loading.close()
                  this.$router.replace("/login")
                }
              })
            } else {
              this.$notify({
                type: "error",
                title: "注册失败",
                message: "注册失败"
              })
            }
          }).catch(res => {
            this.$notify({
              type: "error",
              title: "注册失败",
              message: "服务器未响应，请稍后再试。"
            })
          })
        } else {
          this.$notify({
            type: "error",
            title: "注册失败",
            message: "填写信息有误，请审核。"
          })
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    async addUser(form) {
      return await this.$http.post("/api/user/add", form)
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
        margin-left: 35px !important;
      }
    }
  }
</style>
