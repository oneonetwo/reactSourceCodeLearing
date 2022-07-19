class Updater { 
    constructor(classInstance) { 
        this.classInstance = classInstance;
        this.callbacks = [];//保存要执行的回调
        this.pendingStates = [];//保存要更新的队列

    }
    //partialState和callback没有一对一的关系
    addState(partialStae, callback) { 
        this.pendingStates.push(partialStae);
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
    emitUpdate() { 
        this.updateComponent();//让组件更新
    }
    updateComponent() { 
        let { classInstance, pendingStates} = this;
        if (pendingStates.length > 0) { //有需要等待的更新
            shouldUpdate(classInstance, this.getState());
        }
    }
}
function shouldUpdate(classInstance, nextState) { 
    classInstance.state = nextState; //真正修改实例的状态
    classInstance.forceUpdate(); //然后调用组件实例的updateComponent进行更新
}

export class Component { 
    static isReactComponent = true;
    constructor(props) { 
        this.props = props; 
        this.state = {};
        //每一个类组件的实例都有一个更新器updater
        this.updater = new Updater(this);
    }
    setState(partialStae, callback) { 
        this.updater.addState(partialStae, callback);
    }
    forceUpdate() {
        console.log('组件实例 forceUpdate');
    }
}