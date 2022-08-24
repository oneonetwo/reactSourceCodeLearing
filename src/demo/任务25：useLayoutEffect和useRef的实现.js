/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-17 11:23:41
 * @LastEditTime: 2022-08-24 22:58:00
 * @LastEditors: yjy
 * @Reference: 
 */
// import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from './react-dom.js';
import React from './react.js';

const Animation = () => {
    const ref = React.useRef();
    let style = {
        width: '100px',
        height: '100px',
        backgroundColor: 'red',
        transition: 'all 500ms',
    }
    React.useLayoutEffect(() => { 
        ref.current.style.transform = 'translate(500px)';
    })
    return <div style={style} ref={ ref}>内容</div>  
}

ReactDOM.render(<Animation/> , document.getElementById('root'));





