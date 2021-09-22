/*
 * @Descripttion: 提示信息集合
 * @Author: Irene.Z
 * @Date: 2021-02-17 19:28:47
 * @LastEditTime: 2021-02-17 19:39:56
 * @FilePath: \vue-node-management-system\src\utils\message.js
 */

export const sysMsgToast = (data, isHide) => {
  let type = '';
  if ((data.code == 1) && !isHide) {
    type = 'error';
  }
  this.$notify({
    type,
    title: data.code,
    message: data.message || 'Other',
    duration: 0 // 不自动关闭提示信息
  });
}
