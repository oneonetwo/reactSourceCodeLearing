/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-17 11:23:41
 * @LastEditTime: 2022-08-21 14:37:11
 * @LastEditors: yjy
 * @Reference: 
 */
// import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from './react-dom.js';
import React from './react.js';

function reducer (state, action){ 
    let { type, payload } = action;
    switch (type) { 
        case 'ADD':
            return { number: state.number + 1 };
        case 'MINUS':
            return { number: state.number - 1 };
        default:
            return state;
    }
 }
function App() { 
    const [state, dispatch] = React.useReducer(reducer, {number: 0})
    return <div>
        <p>{ state.number }</p>
        <button onClick={() => dispatch({ type: "ADD" })}> + </button>
        <button onClick={() => dispatch({type: 'MINUS'})}> - </button>
    </div>
}

ReactDOM.render(<App/> , document.getElementById('root'));





