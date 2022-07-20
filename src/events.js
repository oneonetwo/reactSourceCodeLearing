/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-20 21:40:24
 * @LastEditTime: 2022-07-20 22:23:47
 * @LastEditors: yjy
 * @Reference: 
 */

import { updateQueue } from "./Component";

/**
 * 
 * @param {*} dom 
 * @param {*} eventType 
 * @param {*} handler 
 */
export function addEvent(dom, eventType, handler) { 
    let store;//是个对象，存放dom上对应的时间处理函数
    if (dom.store) { 
        store = dom.store;
    } else {
        dom.store = {};
        store = dom.store;
    }
    //store.onclick = handler;
    store[eventType] = handler;
    if(!document[eventType])//如果很多个事件都绑定click事件，那么document只注册一次
    document[eventType] = dispatchEvent;
}
function dispatchEvent(event) {
    let { target, type } = event;
    let eventType = `on${type}`;
    //执行handler之前批量开启
    updateQueue.isBatchingUpdate = true;
    let syntheticEvent = createSyntheticEvent(event);
    //模拟事件冒泡流程
    while (target) { 
        //拿到dom上赋值的store
        let { store} = target;
        let handler = store && store[eventType]
        handler && handler(syntheticEvent);
        target = target.parentNode;
    }
    updateQueue.isBatchingUpdate = false;
    updateQueue.batchUpdate();
} 
//源码再此处做了一些浏览器兼容性适配
function createSyntheticEvent(event) { 
    let syntheticEvent = {};
    for (let key in event) { 
        syntheticEvent[key] = event[key];
    }
    return syntheticEvent;
}