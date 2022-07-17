// import React from 'react';
// import ReactDOM from 'react-dom/client';

import ReactDOM from './react-dom.js';
import React from './react.js';

// let element = <h1 title={'123'}>Hello</h1>;

function greeting(name) { 
  if (name) {
    return <h1>HELLO,<span> { name }</span></h1>
  } else { 
    return <h1>hello, jingyuan</h1>
  }
}

function FunctionComponent(props) { 
  return <h1>hello, { props.name}</h1>
}

let element = React.createElement('div', {
  className: "title",
  style: {
    color: 'red',
  }
}, React.createElement(FunctionComponent, {name: 'jingyuan'}), 'welcome');


console.log(element);
ReactDOM.render(element, document.getElementById('root'));

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   element1
// );

