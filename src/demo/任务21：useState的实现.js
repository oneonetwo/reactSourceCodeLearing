/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-17 11:23:41
 * @LastEditTime: 2022-08-16 08:37:29
 * @LastEditors: yjy
 * @Reference: 
 */
// import React from 'react';
// import ReactDOM from 'react-dom';



import { Component } from './Component.js';
import ReactDOM from './react-dom.js';
import React from './react.js';

function Counter(props) { 
    let [number, setNumber] = React.useState(0);
    let handleClick = () => { 
        setNumber(number + 1);
    }
    return (<div>
        <div>{ number }</div>
        <button onClick={handleClick}> + </button>
    </div>)
}

ReactDOM.render(<Counter />, document.getElementById('root'));





