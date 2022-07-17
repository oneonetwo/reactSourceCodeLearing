// import React from 'react';
// import ReactDOM from 'react-dom/client';

import { render } from './react-dom.js';
import React, {  createElement } from './react.js';

// let element = <h1 title={'123'}>Hello</h1>;

function greeting(name) { 
  if (name) {
    return <h1>HELLO,<span> { name }</span></h1>
  } else { 
    return <h1>hello, jingyuan</h1>
  }
}

let element = createElement('div', {
  className: "title",
  style: {
    color: 'red',
  }
}, createElement("span", null, "hello"), "world");


console.log(JSON.stringify(element, null, 2));
render(element, document.getElementById('root'));

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   element1
// );

