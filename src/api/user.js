/*
 * @Descripttion:
 * @Author: Irene.Z
 * @Date: 2021-09-20 23:36:52
 * @LastEditTime: 2021-11-25 02:45:19
 * @FilePath: \vue-node-management-system\src\api\user.js
 */
import request from "@/utils/request";
import http from "@utils/http";

export function login(data) {
  return http({
    url: "api/user/get",
    method: "post",
    data,
  })
}

export function logout() {
  return request({
    url: "api/logout",
    method: "post",
  })
}

export function getUserInfo() {
  return request({
    url: "api/user/getUserInfoBytoken",
    method: "get"
  })
}

// 登录者的平台操作权限（按钮级别的）
export function authenticateUser() {
  return request({
    url: "api/permission/authenticateUser",
    method: "get",
  })
}

// 编辑校验创建人开关
export function validCreatorSwitch() {
  return request({
    url: "api/switches/valid-creator-switch",
    method: "get",
  })
}
