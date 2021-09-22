<!--
 * @Descripttion:
 * @Author: Irene.Z
 * @Date: 2020-11-04 11:23:32
 * @LastEditTime: 2021-09-21 01:38:00
 * @FilePath: \vue-node-management-system\src\views\afterEnd\user\Detail.vue
-->
<template>
  <div>
    <p>用户详情</p>
    <div>
      <el-form
        ref="form"
        :model="detailsForm"
        :rules="rules"
        label-width="180px"
        size="small"
      >
        <el-form-item
          label="详情类型"
          prop="recordType"
          :required="true"
        >
          <template slot="label">
            <span>详情类型</span>
            <el-tooltip
              placement="bottom"
              effect="dark"
            >
              <div slot="content">
                1.记录用户体重，形成折线图；<br>
                2.记录用户睡眠作息与时长，形成折线图；<br>
                3.记录皮肤状态，形成折线图；<br>
                4.三种状态汇总进行展示；
              </div>
              <i class="el-icon-question" />
            </el-tooltip>
          </template>
          <el-select
            v-model="detailsForm.recordType"
            style="width: 50%"
            filterable
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in recordType"
              :key="item.code"
              :label="item.value"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="开始时间"
          prop="startTime"
          :required="true"
          class="steps-form"
        >
          <el-date-picker
            v-model="detailsForm.startTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间"
            :clearable="false"
            :disabled="isEditProgress"
            @input="handleTimeValChange('startTime', $event)"
          />
        </el-form-item>
        <el-form-item
          label="结束时间"
          prop="endTime"
          class="steps-form"
        >
          <el-date-picker
            v-model="detailsForm.endTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间"
            :clearable="false"
            :disabled="isEditProgress"
            @input="handleTimeValChange('endTime', $event)"
          />
        </el-form-item>
        <el-form-item
          label="添加记录明细"
          prop="records"
          :required="true"
        >
          <el-form
            ref="recordForm"
            :model="detailsForm.records"
            :inline="true"
            size="mini"
          >
            <el-table
              :data="detailsForm.records.recordList"
              max-height="300"
              border
              size="mini"
            >
              <el-table-column
                type="index"
                width="50"
                label="序号"
                fixed="left"
              />

              <el-table-column
                prop="ada"
                label="安利卡号"
                min-width="330px"
                class-name="must"
              >
                <template slot-scope="scope">
                  <el-form-item
                    :prop="`recordList.${scope.$index}.ada`"
                    :rules="validateAdanumber()"
                    class="input-box"
                  >
                    <el-input
                      v-model="scope.row['ada']"
                      clearable
                      placeholder="请输入"
                      :disabled="isEditProgress"
                      size="small"
                      class="input-box"
                    />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="idCard"
                label="身份证号"
                min-width="330px"
              >
                <template slot-scope="scope">
                  <el-form-item
                    :prop="`recordList.${scope.$index}.idCard`"
                    :rules="validateIdCard()"
                    class="input-box"
                  >
                    <el-input
                      v-model="scope.row['idCard']"
                      clearable
                      placeholder="请输入"
                      :disabled="isEditProgress"
                      size="small"
                    />
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column
                label="操作"
                width="100"
              >
                <template slot-scope="scope">
                  <i
                    class="el-icon-delete cursor-btn"
                    @click="deleteItem(scope.$index)"
                  />
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <div class="add-button">
            <span>已添加
              <span class="blue-color">{{ listSize }}</span> 个黑名单</span>
            <el-button
              type="text"
              :disabled="isEditProgress"
              @click="addItem()"
            >
              <i class="el-icon-plus" />
              添加黑名单
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recordType: [
        {code: "weight", value: "体重"},
        {code: "sleep", value: "睡眠"},
        {code: "skinType", value: "肤质"}
      ],
      detailsForm: {
        recordType: "",
        startTime: "",
        endTime: "",
        records: {
          recordList: [
            {
              ada: "",
              idCard: ""
            }
          ]
        }
      },
      rules: { 
        recodeType: [
          { required: true, message: "记录类型是必填项", trigger: "change" },
        ],
        startTime: [
          { required: true, message: "开始时间是必填项", trigger: "blur" },
        ],
        records: [
          {
            validator: (rule, value, callback) => {
              if (
                value.recordList != undefined &&
                value.recordList != null &&
                value.recordList.length > 0
              ) {
                if (value.recordList[0].ada != "") {
                  return callback();
                } else {
                  return callback(new Error("列表不能为空"));
                }
              } else {
                return callback(new Error("列表不能为空"));
              }
            },
            message: "列表不能为空",
            trigger: "blur",
          },
        ],
        idCard: [
          // {required: true, message: "身份证号是必填项！", trigger: "bulr"},
          {validator: (rule, value, callback) => {
            if (value) {
              const _isIDCard_15 =
                /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/; // 15位身份证
              const _isIDCard_18 =
                /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/; // 18位身份证
              const _isIDCard =
                /[1]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/; // 通用
              if (
                value != "" &&
                !_isIDCard_15.test(value) &&
                !_isIDCard_18.test(value) &&
                !_isIDCard.test(value)
              ) {
                // 身份证号，输入项不为空时，校验格式
                callback(new Error(`输入格式不正确`));
              } else {
                callback();
              }
            } else {
              callback();
            }
          }, trigger: "bulr"}
        ]
      }
    }
  },
  created() {
    console.log('user detail router:  ', this.$router)
  },
   methods: {
    validateAdanumber() {
      const check = (rule, value, callback) => {
        if (value) {
          if (!/^[1-9][0-9]{4,8}$/.test(value)) {
            callback(new Error(`请输入不以0开头的数字，长度在5-9之间`));
          } else {
            callback();
          }
        } else {
          callback(new Error(`ADA卡号是必填项`));
        }
      };
      return { required: false, validator: check };
    },
    validateIdCard() {
      const check = (rule, value, callback) => {
        if (value) {
          const _isIDCard_15 =
            /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/; // 15位身份证
          const _isIDCard_18 =
            /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/; // 18位身份证
          const _isIDCard =
            /[1]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/; // 通用
          if (
            value != "" &&
            !_isIDCard_15.test(value) &&
            !_isIDCard_18.test(value) &&
            !_isIDCard.test(value)
          ) {
            callback(new Error(`输入格式不正确`));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      return { required: false, validator: check };
    },
    // 验证时间
    handleTimeValChange(type, val) {
      if (type === "startTime") {
        if (this.stepForm.endTime) {
          let startTime = new Date(val).getTime();
          let endTime = new Date(this.stepForm.endTime).getTime();
          if (startTime >= endTime) {
            this.$message({
              showClose: true,
              message: "开始时间不能大于等于结束时间",
              type: "error",
            });
            this.$set(this.stepForm, type, "");
          }
        }
      } else if (type === "endTime") {
        if (this.stepForm.startTime) {
          let endTime = new Date(val).getTime();
          let startTime = new Date(this.stepForm.startTime).getTime();
          if (startTime >= endTime) {
            this.$message({
              showClose: true,
              message: "结束时间不能小于等于开始时间",
              type: "error",
            });
            this.$set(this.stepForm, type, "");
          }
        }
      }
    },
    async submitForm() {
      let flag = false;
      this.$refs["stepForm"].validate((valid) => {
        if (valid) {
          flag = true;
        } else {
          flag = false;
          console.log("error submit!!");
          return false;
        }
      });

      this.$refs["linkAccountForm"].validate((valid) => {
        if (valid) {
          flag = true;
        } else {
          flag = false;
          console.log("error submit!!");
          return false;
        }
      });

      if (flag) {
        let formData = {
          creator: this.creator || "",
          blackType: this.stepForm.blackType,
          startTime: this.stepForm.startTime,
          endTime: this.stepForm.endTime,
          blackListItems: this.stepForm.linkAccountList.linkAccountForm,
          channel: "OP",
          regionCode: "360",
        };

        try {
          let res = await createBlackItems(formData);

          if (res.code == "0") {
            this.resAccountData = res;
            this.isVisible = true;
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
    addItem() {
      this.$refs["linkAccountForm"].validate((valid) => {
        if (valid) {
          let _item = this.deepClone(this.linkAccountForm);
          let len = this.stepForm.linkAccountList.length;
          let isAdd = true;
          this.$nextTick(() => {
            for (let i = 0; i < len; i++) {
              this.$refs.linkAccountForm.validateField(
                [`linkAccountForm.${i}.ada`, `linkAccountForm.${i}.idCard`],
                (error) => {
                  if (error) {
                    isAdd = false;
                  }
                }
              );
            }
            if (isAdd) {
              this.stepForm.linkAccountList.linkAccountForm.push(_item);
              this.listSize =
                this.stepForm.linkAccountList.linkAccountForm.length - 1;
            }
          });
        } else {
          console.log("请完善上一条黑名单信息!!");
          return false;
        }
      });
    },
    deleteItem(index) {
      if (this.isEditProgress) return;
      this.$confirm("确认要删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.stepForm.linkAccountList.linkAccountForm.length == 1) {
            let _item = this.deepClone(this.linkAccountForm);
            this.$set(this.stepForm.linkAccountList.linkAccountForm, 0, _item);
          } else {
            this.stepForm.linkAccountList.linkAccountForm.splice(index, 1);
          }
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
    },
    // 取消按钮事件
    cancelBtn() {
      this.$refs[`stepForm`].resetFields(); //清空数据
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.push({ name: "Blacklist" });
    },
    closeDialog() {
      this.isVisible = false;
      this.cancelBtn();
    },
  }
}
</script>

<style scoped>
</style>
