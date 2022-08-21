/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-17 11:23:41
 * @LastEditTime: 2022-08-21 14:56:54
 * @LastEditors: yjy
 * @Reference: 
 */
// import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from './react-dom.js';
import React from './react.js';
let CounterContext = React.createContext()

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
 
function Counter() { 
    const { state, dispatch } = React.useContext(CounterContext);
    return <div>
        <p>{state.number}</p>
        <button onClick={() => dispatch({ type: "ADD" })}> + </button>
        <button onClick={() => dispatch({ type: 'MINUS' })}> - </button>
    </div>
}
function App() { 
    const [state, dispatch] = React.useReducer(reducer, {number: 0})
    return <CounterContext.Provider value={{state, dispatch}}>
        <Counter />
    </CounterContext.Provider>
}

ReactDOM.render(<App/> , document.getElementById('root'));