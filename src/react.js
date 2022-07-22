/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-17 21:23:33
 * @LastEditTime: 2022-07-21 00:35:17
 * @LastEditors: yjy
 * @Reference: 
 */
import { wrapToVdom } from "./utils";
import { Component }  from "./Component.js";


export function createElement(type, props, ...children) {
    let {  ...resProps } = props;
    return {
         type,
         ref: props.ref, //获取虚拟dom实例
         key: props.key, //区分父亲的不同儿子
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
export function createRef() { 
    return {current: null}
}
//函数组件没有实例用类组件包装
export function forwardRef(FunctionComponent) { 
    return class extends Component { 
        render() { 
            return FunctionComponent(this.props, this.props.ref);
        }
    }
}

const React = {
    createElement,
    Component,
    createRef,
    forwardRef
}

export default React;