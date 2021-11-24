/*
 * @Descripttion:CBC加密模式
 * @Author: Irene.Z
 * @Date: 2021-02-05 14:30:59
 * @LastEditTime: 2021-11-08 03:06:03
 * @FilePath: \vue-node-management-system\src\utils\CryptoJS.js
 */
import CryptoJS from "crypto-js";

/**
 * ECB： 是一种基础的加密方式，密文被分割成分组长度相等的块（不足补齐），然后单独一个个加密，一个个输出组成密文。
 *
 * CBC： 是一种循环模式，前一个分组的密文和当前分组的明文异或或操作后再加密，这样做的目的是增强破解难度。（不容易主动攻击，安全性好于ECB，是SSL、IPSec的标准）
 */
export default {
  /**
   * 加密
   * 对密码进行加密，传输给后台进行验证
   * @param {String} word  需要加密的密码
   * @param {String} keyStr  对密码加密的秘钥
   * @param {*} ivStr  初始化向量是16位长度的字符串
   * @return {String}   加密的密文
   */
  encrypt(word, keyStr, ivStr) {
    keyStr = keyStr || "azylietlj37fai12";
    ivStr = ivStr || "azylietlj37fai12";
    const key = CryptoJS.enc.Utf8.parse(keyStr);
    const iv = CryptoJS.enc.Utf8.parse(ivStr);
    const srcs = CryptoJS.enc.Utf8.parse(word);

    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    });
    return encrypted.toString();
  },

  /**
   * 解密
   * @param {*} word  需要加密的密码
   * @param {*} keyStr  对密码加密的秘钥
   * @param {*} ivStr  初始化向量是16位长度的字符串
   */
  decrypt(word, keyStr, ivStr) {
    keyStr = keyStr || "azylietlj37fai12";
    ivStr = ivStr || "azylietlj37fai12";
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    const iv = CryptoJS.enc.Utf8.parse(ivStr);

    var decrypt = CryptoJS.AES.decrypt(word, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    });
    return decrypt.toString(CryptoJS.enc.Utf8);
  }
};
