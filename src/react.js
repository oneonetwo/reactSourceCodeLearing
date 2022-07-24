/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-17 21:23:33
 * @LastEditTime: 2022-07-23 21:07:01
 * @LastEditors: yjy
 * @Reference: 
 */
import { wrapToVdom } from "./utils";
import { Component }  from "./Component.js";
import { REACT_FORWARDS_REF_TYPE } from "./constants";


export function createElement(type, props, ...children) {
    let { ref, key,  ...resProps } = props;
    return {
         type,
         ref: ref, //获取虚拟dom实例
         key: key, //区分父亲的不同儿子
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
// export function forwardRef(FunctionComponent) {
//     return class extends Component {
//         render() {
//             return FunctionComponent(this.props, this.props.ref);
//         }
//     }
// }
export function forwardRef(render) { 
    return {
        $$typeof: REACT_FORWARDS_REF_TYPE,
        render//函数组件
    }
}

const React = {
    createElement,
    Component,
    createRef,
    forwardRef
}

export default React;