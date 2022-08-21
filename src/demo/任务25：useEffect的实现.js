/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-17 11:23:41
 * @LastEditTime: 2022-08-21 20:36:23
 * @LastEditors: yjy
 * @Reference: 
 */
// import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from './react-dom.js';
import React from './react.js';

function Counter() { 

}
function App() { 
    const [number, setNumber] = React.useState(0)
    
    React.useEffect(() => {
        let timer = setTimeout(() => { 
            setNumber(number + 1);
        }, 1000)
        return () => {
            clearTimeout(timer);
        };
    }, [number]);

    return <div>
        { number }
    </div>
}

ReactDOM.render(<App/> , document.getElementById('root'));





