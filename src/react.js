/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-17 21:23:33
 * @LastEditTime: 2022-08-21 14:58:23
 * @LastEditors: yjy
 * @Reference: 
 */
import { shallowEqual, wrapToVdom } from "./utils";
import { Component, PureComponent }  from "./Component.js";
import { REACT_CONTEXT, REACT_FORWARDS_REF_TYPE, REACT_MEMO, REACT_PROVIDER } from "./constants";
import { useCallback, useMemo, useState, useReducer } from "./react-dom";


function createElement(type, config, children) {
    let ref; //是用来获取虚拟DOM实例的
    let key; //用来区分同一个父亲的不同儿子的
    if (config) {
        delete config.__source;
        delete config.__self;
        ref = config.ref;
        delete config.ref;
        key = config.key;
        delete config.key;
    }
    let props = {
        ...config
    }; //没有ref和key
    if (arguments.length > 3) { //如果参数大于3个，说明有多个儿子
        //核心就是把字符串或者说数字类型的节点转换成对象的形式
        props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
    } else {
        if (typeof children !== 'undefined')
            props.children = wrapToVdom(children);
        //children可能是一个字符串，也可能是一个数字，也可能是个null undefined,也可能是一个数组
    }
    return {
        type,
        props,
        ref,
        key
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

// export function createContext() {
//     let context = {};
//     function Provider({ value, children}) {
//         context._value = value;
//         return children[0];
//     }
//     function Consumber({children}) {
//         return children[0](context._value);
//     }
//     context.Provider = Provider;
//     context.Consumber = Consumber;
//     return context;
// }
function createContext(){
    let context = {$$typeof: REACT_CONTEXT};
    context.Provider = {$$typeof: REACT_PROVIDER, _context: context};
    context.Consumer = {$$typeof: REACT_CONTEXT, _context: context};
    return context;
}
/**
 * 根据一个老的react元素克隆出一个新的元素
 * @param {*} oldElement 老元素
 * @param {*} newProps 新属性
 * @param {*} children 新的儿子
 */
export function cloneElement(oldElement, newProps, children) {
    //处理下children
    if (arguments.length > 3) {
        children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
    } else {
        children = wrapToVdom(children);
    }
    //属性覆盖
    let props = { ...oldElement.props, ...newProps, children };
    //合并虚拟dom
    return {...oldElement, props}
} 
/**
 * 
 * @param {*} type  函数组件 
 * @param {*} compare 默认是浅比较
 */
export function memo(type, compare=shallowEqual) { 
    return {
        $$typeof: REACT_MEMO,
        type,
        compare
    }
}
export function useContext(context) { 
    return context._currentValue;
}
const React = {
    createElement,
    cloneElement,
    createContext,
    Component,
    PureComponent,
    createRef,
    forwardRef,
    memo,
    useState,
    useReducer,
    useMemo,
    useCallback,
    useContext
}

export default React;