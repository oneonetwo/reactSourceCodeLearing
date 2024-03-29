/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-18 22:04:51
 * @LastEditTime: 2022-08-10 22:36:51
 * @LastEditors: yjy
 * @Reference: 
 */
import { findDOM, compareTwoVdom } from "./react-dom";
import { shallowEqual } from "./utils";

export let updateQueue = {
    isBatchingUpdate: false, //通过此变量来控制变量更新
    updaters: [],
    batchUpdate() { 
        for (let updater of updateQueue.updaters) { 
            updater.updateComponent();
        }
        updateQueue.isBatchingUpdate = false;
        updateQueue.updaters.length = 0;
    }
}

class Updater { 
    constructor(classInstance) { 
        this.classInstance = classInstance;
        this.callbacks = [];//保存要执行的回调
        this.pendingStates = [];//保存要更新的队列

    }
    //partialState和callback没有一对一的关系
    addState(partialState, callback) { 
        this.pendingStates.push(partialState);
        if (typeof callback === 'function') { 
            this.callbacks.push(callback);
        }
        this.emitUpdate();//触发更新逻辑
    }
    getState() { 
        let { classInstance, pendingStates, callbacks } = this;
        let { state } = classInstance; //获取老的原始的组件的状态
        pendingStates.forEach(nextState => { 
            if (typeof nextState === 'function') { 
                nextState = nextState(state);
            }
            state = { ...state, ...nextState };
        })
        pendingStates.lenght = 0;//清空等待更新的队列
        callbacks.forEach(callback => callback());
        this.callbacks.length = 0;
        return state;
    }
    //不管状态和属性的变化，都会让组件刷新，执行次方法。
    emitUpdate(nextProps) { 
        this.nextProps = nextProps;
        //如果当前处于批量更新模式，那么就把updater实例添加到updateQueue中
        if (updateQueue.isBatchingUpdate) {
            updateQueue.updaters.push(this);
        } else { 
            this.updateComponent();//让组件更新
        }
    }
    updateComponent() { 
        let { classInstance, pendingStates, nextProps} = this;
        if (nextProps || pendingStates.length > 0) { //有需要等待的更新
            shouldUpdate(classInstance, nextProps,this.getState());
        }
    }
}
function shouldUpdate(classInstance, nextProps, nextState) { 
    let willUpdate = true; //默认更新
    //如果shouldComponentUpdate返回false则不更新
    if (classInstance.shouldComponentUpdate && !classInstance.shouldComponentUpdate(nextProps, nextState)) { //
        willUpdate = false;
    }
    if (willUpdate && classInstance.componentWillUpdate) {
        classInstance.componentWillUpdate();
    } 
    //不管组件要不要更新，state和props都要更新为最新的
    if (nextProps) classInstance.props = nextProps;
    if (classInstance.constructor.getDerivedStateFromProps) {
        let nextState = classInstance.constructor.getDerivedStateFromProps(nextProps, classInstance.state);
        if (nextState) {
            classInstance.state = nextState;
        }
    } else { 
        classInstance.state = nextState; //真正修改实例的状态
    }
    if (willUpdate) { 
        classInstance.forceUpdate(); //然后调用组件实例的updateComponent进行更新
    }
}

export class Component { 
    static isReactComponent = true;
    constructor(props) { 
        this.props = props; 
        this.state = {};
        //每一个类组件的实例都有一个更新器updater
        this.updater = new Updater(this);
    }
    setState(partialState, callback) { 
        this.updater.addState(partialState, callback);
    }
    /**
     * 组件的更新
     * 1. 获取 老的虚拟dom React元素
     * 2. 根据最新的属性和状态计算新的虚拟DOM
     * 然后进行比较，查找差异，把这些差异同步到真实的dom
     */
    forceUpdate() {
        let oldRenderVdom = this.oldRenderVdom; //老的虚拟dom
        let oldDOM = findDOM(oldRenderVdom);//根据老的虚拟dom，找到老地真实dom;
        //给类组件的contextType赋值。
        if (this.constructor.contextType) {
            this.context = this.constructor.contextType._currentValue;
        }
        let newRenderVdom = this.render();//
        let extraArgs;
        if (this.getSnapshotBeforeUpdate) {
            extraArgs = this.getSnapshotBeforeUpdate();
        }
        compareTwoVdom(oldDOM.parentNode, oldRenderVdom, newRenderVdom);//比较差异，把更新同步到真实的dom.
        this.oldRenderVdom = newRenderVdom;
        if (this.componentDidUpdate) { 
            this.componentDidUpdate(this.props, this.state, extraArgs);//snapshot的返回值作为第三个参数
         }
    }
}

export class PureComponent extends Component{
    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    }
}