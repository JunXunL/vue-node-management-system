/*
 * @Descripttion: 存取Cookie
 * @version:
 * @Author: Irene.Z
 * @Date: 2020-11-17 09:52:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-25 02:53:40
 */

/**
 * 1、存cookie  set方法支持的属性有：
 * path->设置为指定页面创建cookie
 * expires-》过期时间
 * domain-》设置对指定域名及指定域名的子域名可见
 * secure->值有false和true ,表示设置是否只支持https,默认是false
 */
// Cookies.set('key', 'value');  //创建简单的cookie
// Cookies.set('key', 'value', { expires: 27 });//创建有效期为27天的cookie
// Cookies.set('key', 'value', { expires: 17, path: ''  }); //可以通过配置path,为当前页创建有效期7天的cookie

// 2、取cookie
// Cookies.get('key'); // 获取指定key 对应的value
// Cookies.get(); //获取所有value

// 3、删除cookie
// Cookies.remove('key');//删除普通的cookie
// Cookies.remove('name', { path: '' }); // 删除存了指定页面path的cookie

/**
 * 注意：如果存的是对象
 * 如： userInfo = {age:111,score:90};
 * Cookie.set('userInfo',userInfo);
 * 取出来的userInfo需要进行JSON的解析,解析为对象：let res = JSON.parse( Cookie.get('userInfo') );
 * 也可以使用：Cookie.getJSON('userInfo');
 */

import Cookies from "js-cookie";

const CURRENT_USER = "vue_node_managesys_user_token";

export function getToken(key) {
  return key ? Cookies.get(key) : Cookies.get(CURRENT_USER);
}

export function setToken(key, value) {
  return (key && value) ? Cookies.set(key, value) : Cookies.set(CURRENT_USER, value);
}

export function removeToken(key) {
  return key ? Cookies.remove(key) : Cookies.remove(CURRENT_USER);
}
