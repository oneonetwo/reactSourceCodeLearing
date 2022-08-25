/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-17 11:23:41
 * @LastEditTime: 2022-08-25 22:17:01
 * @LastEditors: yjy
 * @Reference: 
 */
// import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from './react-dom.js';
import React from './react.js';
function Child(props, ref) { 
    const childRef = React.useRef();
    //函数组件中可以自定义暴漏给父组件的ref的对象
    React.useImperativeHandle(ref, () => ({ 
        focus(){ 
            childRef.current.focus();
        }
    }))
    return <input type="text" ref={ ref } />
}
let ForwardChild = React.forwardRef(Child);
function App() { 
    let inputRef = React.useRef();
    return <div>
        <ForwardChild ref={inputRef}></ForwardChild>   
        <button onClick={e => { inputRef.current.focus()  }}>获取焦点</button>
    </div>
}

ReactDOM.render(<App/> , document.getElementById('root'));





