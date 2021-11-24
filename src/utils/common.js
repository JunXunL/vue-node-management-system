/*
 * @Descripttion: 公用方法集合
 * @Author: Irene.Z
 * @Date: 2021-02-17 19:25:25
 * @LastEditTime: 2021-11-08 03:09:34
 * @FilePath: \vue-node-management-system\src\utils\common.js
 */
import defaultSetting from "./setting";

// 返回页面标题
export function getPageTitle(title) {
  const pageTitle = title || defaultSetting.title;
  return pageTitle ? (`${pageTitle} - ${title}`) : `${title}`;
}

/**
 * 功能：虚拟三级，实际二级路由。对配置二级（虚拟）路由添加inventedRoute: true,通过算法遍历的形式，把三级（概念上的）转化为二级（真实）。这样一来，父路由配置要放在真实的父路由上。
 * 即，将多个路由模块集合，扩展开，分模块配置子级路由于父级路由模块中。最后按照父级路由模块（一级路由）分类展示子级路由（二级路由）。
 * @param {Array[Object]} router
 * @param {string} prefix
 * @returns {Object}
 */
export function delteFakeParent(router, prefix) {
  let newRouter = { ...router }; // 将嵌套的路由对象的数组，扩展
  if (prefix) { // path属性的拼接
    newRouter.path = prefix + "/" + router.path;
  }
  if (!router.children) return newRouter; // 没有包含子集路由，既是最后的子级路由，直接返回
  const children = []; // new Array();
  if (router.children && Array.isArray(router.children)) {
    if (router.inventedRoute) { // 二级（虚拟）路由标识
      for (let i = 0; i < router.children.length; i++) {
        const item = delteFakeParent(router.children[i], newRouter.path);
        if (Array.isArray(item)) {
          item.forEach((el) => {
            children.push(el);
          });
        } else {
          if (!item.meta.parentMenu && `${newRouter.path}/index` !== item.path && newRouter.path.split("/").length > 1) {
            item.meta.parentMenu = `/${newRouter.path}/index`;
          }
          children.push(item);
        }
      }
      newRouter = children;
    } else {
      for (let i = 0; i < router.children.length; i++) {
        const item = delteFakeParent(router.children[i]);
        if (Array.isArray(item)) {
          item.forEach((el) => {
            children.push(el);
          });
        } else {
          children.push(item);
        }
      }
      newRouter.children = children;
    }
  }
  return newRouter;
}

// 脱敏设置
