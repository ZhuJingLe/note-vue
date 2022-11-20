/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  // use 方法接收一个参数 plugin 参数类型可以为 Function 或 Object
  Vue.use = function (plugin: Function | Object) {
    // 定义一个记录已经安装了的插件数组列表
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    // 如果 plugin 在安装数组里面存在则不再进行安装（不往后面执行）
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }
    // 得到除 plugin 之外的参数
    const args = toArray(arguments, 1)
    // 使 install 方法接收的第一个参数为 this 即 Vue
    args.unshift(this)
    // plugin 是一个对象且含有 install 方法
    if (typeof plugin.install === 'function') {
      // 调用函数 install 给 Vue 添加扩展功能
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') { 
      // plugin 为一个函数
      // 调用函数 install 给 Vue 添加扩展功能
      plugin.apply(null, args)
    }
    // 将当前插件记录到已安装插件列表
    installedPlugins.push(plugin)
    // 返回 this 说明可以进行链式调用
    return this
  }
}
