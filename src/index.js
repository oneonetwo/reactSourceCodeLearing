import React from 'react';
import ReactDOM from 'react-dom/client';


let element = <h1 title={'123'}>Hello</h1>;

function greeting(name) { 
  if (name) {
    return <h1>HELLO,<span> { name }</span></h1>
  } else { 
    return <h1>hello, jingyuan</h1>
  }
}

let element2 = greeting('weiwie');
console.log('element', element);
console.log('element', element2);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  element2
);

