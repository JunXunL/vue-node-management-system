/*
 * @Descripttion: 公用方法集合
 * @Author: Irene.Z
 * @Date: 2021-02-17 19:25:25
 * @LastEditTime: 2021-09-21 23:43:22
 * @FilePath: \vue-node-management-system\src\utils\common.js
 */
import defaultSetting from "./setting";

// 返回页面标题
export function getPageTitle(title) {
  const pageTitle = title || defaultSetting.title;
  return pageTitle ? (`${pageTitle} - ${title}`) : `${title}`;
}


// 脱敏设置