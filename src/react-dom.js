/*
 * @Author: jingyuan.yang jingyuan.yang@prnasia.com
 * @Date: 2022-07-17 21:49:51
 * @LastEditors: yjy
 * @LastEditTime: 2022-07-22 07:28:47
 * @FilePath: \zhufeng2022react_self\src\react-dom.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { REACT_TEXT } from "./constants";
import { addEvent } from './events';
//把虚拟dom转成真实dom插入到容器中
export function render(vdom, container) { 
    let newDom = createDOM(vdom);
    container.appendChild(newDom);
}
/**
 * 把虚拟dom转成真实的dom 
 */
function createDOM(vdom) { 
    let { type, props, ref, key } = vdom;
    let dom;
    if (type === REACT_TEXT) {
        dom = document.createTextNode('');
    } else if (typeof type === 'function') { 
        if (type.isReactComponent === true) {
            return mountClassComponent(vdom);
        } else { 
            return mountFunctionComponent(vdom);
        }
    } else { 
        dom = document.createElement(type);
    }
    if (props) { 
        updateProps(dom, {}, props);
        if (props.children) {
            reconcileChildren(props.children, dom);
        }
    }
    //dom属性挂载真实的dom;
    vdom.dom = dom;
    if(ref) ref.current = dom;
    return dom;
}
//类组件的处理
function mountClassComponent(vdom) {
    let { type, props, ref } = vdom;
    let classInstance = new type(props);
    //render渲染之前挂载
    if (classInstance.componentWillMount) classInstance.componentWillMount();
    let renderDom = classInstance.render();
    //render渲染之后挂载完成
    if (classInstance.componentDidMount) classInstance.componentDidMount();
    //TODO
    classInstance.oldRenderVdom = vdom.oldRenderVdom = renderDom; //把老的虚拟dom挂载到实例上
    if (ref) ref.current = classInstance;
    return createDOM(renderDom);
    
}
//函数式组件的处理
function mountFunctionComponent(vdom) { 
    let { type, props } = vdom;
    let renderDom = type(props);
    vdom.oldRenderVdom = renderDom;
    return createDOM(renderDom);
}
function reconcileChildren (childVdom, parentDom){
    childVdom.forEach(child => { 
        render(child, parentDom);
    })
}
/**
 * 更新dom的props 
 */
function updateProps(dom, oldProps, newProps) { 
    let isProperty = key => key!== 'children';
    Object.keys(newProps)
        .filter(isProperty)
        .forEach(key => { 
            if (key === 'style') {
                let styleObj = newProps[key];
                for (let attr in styleObj) {
                    dom.style[attr] = styleObj[attr];
                }
            } else if (key.startsWith('on')) {  //onClick  =>  dom onclick
                // dom[key.toLocaleLowerCase()] = newProps[key];
                addEvent(dom, key.toLocaleLowerCase(), newProps[key]);
            } else {
                dom[key] = newProps[key];
             }
        })
}

/**
 * 
 * @param {*} vdom 
 * @returns 
 */
export function findDOM(vdom) { 
    let { type } = vdom;
    if (typeof type === 'function') {
        //如果是函数的话，那么找到他的oldRenderVdom的真实DOM元素
        return findDOM(vdom.oldRenderVdom);
    } else { 
        return vdom.dom;
    }
}
/**
 * 比较新旧的虚拟DOM. 找出差异，更新到真实DOM上
 * @param {*} parentDOM 
 * @param {*} oldVdom 
 * @param {*} newVdom 
 */
export function compareTwoVdom(parentDOM, oldVdom, newVdom) { 
    let oldDOM = findDOM(oldVdom);
    let newDOM = createDOM(newVdom);
    parentDOM.replaceChild(newDOM, oldDOM);
}
const ReactDOM = {
    render
}

export default ReactDOM;