/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-17 21:23:33
 * @LastEditTime: 2022-07-21 00:02:59
 * @LastEditors: yjy
 * @Reference: 
 */
import { wrapToVdom } from "./utils";
import { Component }  from "./Component.js";

export function createElement(type, props, ...children) {
    let { ref, key, ...resProps } = props;
    return {
         type,
         ref: ref,//获取虚拟dom实例
         key: key,//区分父亲的不同儿子
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
    return {current: null}
}

const React = {
    createElement,
    Component,
    createRef
}

export default React;