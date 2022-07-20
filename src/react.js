/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-17 21:23:33
 * @LastEditTime: 2022-07-20 23:16:17
 * @LastEditors: yjy
 * @Reference: 
 */
import { wrapToVdom } from "./utils";
import { Component }  from "./Component.js";

export function createElement(type, props, ...children) {
    let { ref, key, ...resProps } = props;

     return {
         type,
         ref,//获取虚拟dom实例
         key,//区分父亲的不同儿子
         props: {
             ...resProps,
             children: children.map(child => {
                 return typeof child === 'object'
                     ? child
                     : wrapToVdom(child);
             })
         }
     }
}
export function createRef(defaultValue) { 
    return {current: defaultValue||null}
}

const React = {
    createElement,
    Component,
    createRef
}

export default React;