/*
 * @Descriptin:
 * @Version: 0.1
 * @Author: Irene.Z
 * @Date: 2021-09-25 15:43:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-25 02:50:00
 */

/**
 * 使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。
 * 这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中，可以让代码合作者对整个 app 包含的 mutation 一目了然。
 */
export const SOME_MUTATION = "SOME_MUTATION";
