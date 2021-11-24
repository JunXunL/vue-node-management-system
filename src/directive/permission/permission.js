/*
 * @Descripttion: 自定义指令，权限控制指令
 * @Author: Irene.Z
 * @Date: 2021-09-22 00:13:45
 * @LastEditTime: 2021-11-25 02:46:27
 * @FilePath: \vue-node-management-system\src\directive\permission\permission.js
 */

import store from "@store";
import { Message } from "element-ui";

function checkPermission(el, binding) {
  const { value } = binding;
  const roles = store.getters && store.getters.roles; // 当前用户所带的角色权限集合
  const userId = store.getters && store.getters.userId;
  if (value && value instanceof Object) {
    const _value = value.roles ? value.roles : value; // 当前事件上绑定的权限
    const _creator = value.creator ? value.creator : "";
    if (_value.length > 0) {
      const permissionRoles = _value;
      const hasPermission = roles.some((role) => {
        // 当前登陆的用户权限（按钮级别的权限集合），是否包含，事件上绑定所需的权限
        return permissionRoles.includes(role);
      });
      // 没有权限处理
      if (!hasPermission) {
        if (_creator && _creator === userId) return; // 对于编辑删除按钮，用户没有超级权限时，可以编辑自己创建的活动
        const cloneEl = el.cloneNode(true);
        cloneEl.addEventListener("click", function() {
          Message.error("没有该操作权限，请联系系统管理员！");
        });
        // 替换掉原来绑定事件的节点
        el.parentNode && el.parentNode.replaceChild(cloneEl, el);
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','editor']"`);
  }
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding);
  },
  update(el, binding) {
    checkPermission(el, binding);
  },
}
