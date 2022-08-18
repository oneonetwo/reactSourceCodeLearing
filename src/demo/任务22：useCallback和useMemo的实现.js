/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-17 11:23:41
 * @LastEditTime: 2022-08-18 22:29:15
 * @LastEditors: yjy
 * @Reference: 
 */
// import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from './react-dom.js';
import React from './react.js';

function Counter({ data, handleClick}) { 
    console.log('Counter render')
    return <button onClick={handleClick}>{ data.number }</button>
}
let MemoCounter = React.memo(Counter);
function App() { 
    let [name, setName] = React.useState('jingyuan');
    let [number, setNumber] = React.useState(0);
    let handleClick = React.useCallback(() => {
        setNumber(number + 1);
    }, [number])
    let data = React.useMemo(() => ({ number }), [number]);
    console.log('App render')
    return <div>
        <input type={'text'} value={name} onChange={e => setName(e.target.value)} />
        <MemoCounter data={data} handleClick={ handleClick} />
    </div>
}

ReactDOM.render(<App/> , document.getElementById('root'));





