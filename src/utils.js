import {
    REACT_TEXT
} from './constants';
/**
 * 不管原来是什么样的元素，都转成对象的形式，方便后续的DOM-DIFF
 * @param {*} element 
 * @returns 
 */
export function wrapToVdom(element) {
    if (typeof element === 'string' || typeof element === 'number') {
        //返回的也是React元素，也是虚拟DOM 
        return {
            type: REACT_TEXT,
            props: {
                nodeValue: element
            }
        }; //虚拟DOM.props.content就是此文件的内容
    } else {
        return element;
    }
}