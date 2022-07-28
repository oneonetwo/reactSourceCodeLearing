/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-17 21:23:33
 * @LastEditTime: 2022-07-29 00:21:46
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
             children: [].concat(...children).map(child => {
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

export function createContext() {
    let context = {};
    function Provider({ value, children}) { 
        context._value = value;
        return children[0];
    }
    function Consumber({children}) { 
        return children[0](context._value);
    }
    context.Provider = Provider;
    context.Consumber = Consumber;
    return context;
}
/**
 * 根据一个老的react元素克隆出一个新的元素
 * @param {*} oldElement 老元素
 * @param {*} newProps 新属性
 * @param {*} children 新的儿子
 */
export function cloneElement(oldElement, newProps, ...oldChildren) { 
    //处理下children
    let children = oldChildren.map(child => {
        return typeof child === 'object' ?
            child :
            wrapToVdom(child);
    })
    //属性覆盖
    let props = { ...oldElement.props, ...newProps, children };
    //合并虚拟dom
    return {...oldElement, props}
} 

const React = {
    createElement,
    cloneElement,
    createContext,
    Component,
    createRef,
    forwardRef
}

export default React;