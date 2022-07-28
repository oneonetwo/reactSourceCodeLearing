/*
 * @Author: jingyuan.yang jingyuan.yang@prnasia.com
 * @Date: 2022-07-17 21:49:51
 * @LastEditors: yjy
 * @LastEditTime: 2022-07-29 00:21:13
 * @FilePath: \zhufeng2022react_self\src\react-dom.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { REACT_FORWARDS_REF_TYPE, REACT_TEXT } from "./constants";
import { addEvent } from './events';

//把虚拟dom转成真实dom插入到容器中
export function render(vdom, container) { 
    let newDOM = createDOM(vdom);
    container.appendChild(newDOM);
    if (newDOM.componentDidMount) newDOM.componentDidMount();
}
/**
 * 把虚拟dom转成真实的dom 
 */
function createDOM(vdom) { 
    console.log('vdom', vdom);
    let { type, props, ref, key } = vdom;
    let dom;
    // forwardsref类型
    if (type && type.$$typeof === REACT_FORWARDS_REF_TYPE) { 
        return mountForwardComponent(vdom);
    }else if (type === REACT_TEXT) {
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
//forwardRef组件的处理
function mountForwardComponent(vdom) { 
    let { type, props, ref } = vdom;
    let renderVdom = type.render(props, ref);
    vdom.oldRenderVdom = renderVdom;
    return createDOM(renderVdom);
}
//类组件的处理
function mountClassComponent(vdom) {
    let { type, props, ref } = vdom;
    let defaultProps = type.defaultProps || {};
    let classInstance = new type({ ...defaultProps, ...props });
    //给类组件的contextType赋值。
    if (type.contextType) { 
        classInstance.context = type.contextType._value;
    }
    vdom.classInstance = classInstance;
    //render渲染之前挂载
    if (classInstance.componentWillMount) classInstance.componentWillMount();
    let renderVdom = classInstance.render();
    //TODO 
    classInstance.oldRenderVdom = vdom.oldRenderVdom = renderVdom; //把老的虚拟dom挂载到实例上
    if (ref) ref.current = classInstance;
    let dom = createDOM(renderVdom);
    //render渲染之后挂载完成
    if (classInstance.componentDidMount) { 
        dom.componentDidMount = classInstance.componentDidMount.bind(classInstance);
    }
    return dom;
    
}
//函数式组件的处理
function mountFunctionComponent(vdom) { 
    let { type, props } = vdom;
    let renderDom = type(props);
    vdom.oldRenderVdom = renderDom;
    return createDOM(renderDom);
}
function reconcileChildren(childVdom, parentDOM) {
    childVdom.forEach(child => { 
        render(child, parentDOM);
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
    let dom;
    if (typeof type === 'string' || type === REACT_TEXT) {
        dom = vdom.dom;
    } else { //可能是函数组件，类组件， provider contenxt forward;
        dom = findDOM(vdom.oldRenderVdom);
    }
    return dom;
}
/**
 * 比较新旧的虚拟DOM. 找出差异，更新到真实DOM上
 * @param {*} parentDOM 
 * @param {*} oldVdom 
 * @param {*} newVdom 
 */
export function compareTwoVdom(parentDOM, oldVdom, newVdom, nextDOM) { 
    if (!oldVdom && !newVdom) {
        //1.如果老地vdom是null, 新的vdom也是null,那么返回null;
    } else if (!newVdom && oldVdom) {
        //2.老的vdom不为null,新的vdom为null,销毁组件。
        let currentDOM = findDOM(oldVdom);
        currentDOM.parentNode.removeChild(currentDOM);
        //如果组件有卸载的生命周期函数则 执行卸载的生命周期
        if (oldVdom.classInstance && oldVdom.classInstance.componentWillUnmount) {
            oldVdom.classInstance.componentWillUnmount();
        }
    } else if (newVdom && !oldVdom) {
        //3. 如果老vdom没有新的vdom有那么。插入新的。。TODO
        let newDOM = createDOM(newVdom);
        if (nextDOM) {
            parentDOM.insertBefore(newDOM, nextDOM);//inserBefore 此处要插入到的位置
        } else { 
            parentDOM.appendChild(newDOM);
        }
        if (newDOM.componentDidMount) newDOM.componentDidMount();
    } else if (oldVdom && newVdom && (oldVdom.type !== newVdom.type)) {
        //4. 如果新老vdom都有，但是类型不一样。那么去除老vdom.创建新的真实dom
        let oldDOM = findDOM(oldVdom);
        let newDOM = createDOM(newVdom);
        oldDOM.parentNode.replaceChild(newDOM, oldDOM);
        //执行vdom卸载的方法
        if (oldVdom.classInstance && oldVdom.classInstance.componentWillUnmount) {
            oldVdom.classInstance.componentWillUnmount();
        }
        if (newDOM.componentDidMount) newDOM.componentDidMount();
    } else {
        //5. 新的有，老的也有。type也一样那么进行深度的递归
        updateElement(oldVdom, newVdom);
     }
}

function updateElement(oldVdom, newVdom) {
    //oldVdom的type 文本节点类型   原生节点类型  函数类型(类组件，函数组件)
    if (oldVdom.type === REACT_TEXT && newVdom.type === REACT_TEXT) {
        let currentDOM = newVdom.dom = findDOM(oldVdom);
        if (oldVdom.props.nodeValue !== newVdom.props.nodeValue) {
            currentDOM.textContent = newVdom.props.nodeValue;
        }
    } else if (typeof oldVdom.type === 'string') { //说明是原生组件 div
        //让新的vdom的真实dom属性等于老vdom的真实dom;
        let currentDOM = newVdom.dom = findDOM(oldVdom);
        //用新的props更新DOM的属性
        updateProps(currentDOM, oldVdom.props, newVdom.props);
        //更新children;
        updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);
    } else if (typeof oldVdom.type === 'function') { 
        if (oldVdom.type.isReactComponent) {
            //类组件
            updateClassComponent(oldVdom, newVdom);
        } else { 
            //函数组件
            updateFunctionComponent(oldVdom, newVdom);
        }
    }
}

function updateClassComponent(oldVdom, newVdom) {
    let classInstance =  newVdom.classInstance = oldVdom.classInstance;
    newVdom.oldRenderVdom = oldVdom.oldRenderVdom;
    //因为次更新是由于父组件更新引起的，父组件的再重新渲染的时候，给子组件传递新的属性更新；
    if (classInstance.componentWillReceiveProps) { 
        classInstance.componentWillReceiveProps();
    }
    classInstance.updater.emitUpdate(newVdom.props);
}
function updateFunctionComponent(oldVdom, newVdom) { 
    let parentDOM = findDOM(oldVdom).parentNode;
    let { type, props } = newVdom;
    let renderVdom = type(props);
    compareTwoVdom(parentDOM, oldVdom.oldRenderVdom, renderVdom);
}

function updateChildren(parentDOM, oldVChildren, newVChildren) { 
    let maxLength = Math.max(oldVChildren.length, newVChildren.length);
    for (let i = 0; i < maxLength; i++) { 
        //找当前的虚拟DOM节点这后的最近的一个真实DOM节点
        let nextVnode = oldVChildren.find((item, index) => index > i && item && findDOM(item));
        compareTwoVdom(parentDOM, oldVChildren[i], newVChildren[i], nextVnode&&findDOM(nextVnode));
    }
}
const ReactDOM = {
    render
}

export default ReactDOM;