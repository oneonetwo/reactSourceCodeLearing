import { REACT_TEXT } from "./constants";

//把虚拟dom转成真实dom插入到容器中
export function render(vdom, container) { 
    let newDom = createDom(vdom);
    container.appendChild(newDom);
}
/**
 * 把虚拟dom转成真实的dom 
 */
function createDom(vdom) { 
    let { type, props } = vdom;
    let dom;
    if (type === REACT_TEXT) {
        dom = document.createTextNode('');
    } else if (typeof type === 'function') { 
        return mountFunctionComponent(vdom);
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
    return dom;
}

//函数式组件的处理
function mountFunctionComponent(vdom) { 
    let { type, props } = vdom;
    let funVdom = type(props);
    return createDom(funVdom);
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
            } else {
                dom[key] = newProps[key];
             }
        })
}

const ReactDOM = {
    render
}

export default ReactDOM;