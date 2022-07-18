// import React from 'react';
// import ReactDOM from 'react-dom';

import ReactDOM from './react-dom.js';
import React from './react.js';

// let element = <h1 title={'123'}>Hello</h1>;

/**
 *函数式组件 
 */
function FunctionComponent(props) { 
  return <h1>hello, { props.name}</h1>
}

// let element = React.createElement('div', {
//   className: "title",
//   style: {
//     color: 'red',
//   }
// }, React.createElement(FunctionComponent, {name: 'jingyuan'}), 'welcome');

/** 
 *类组件
 */ 
class ClassComponent extends React.Component { 
  render() { 
    return (< h1 className={"title"} style={{ color: 'red' }}><span>hello</span>{this.props.name} </h1>)
  }
}
const element = <ClassComponent name={'jingyaun'}></ClassComponent>
// console.log('functionComponent', <FunctionComponent name={'威威'} />)
console.log('ClassComponent', element);
ReactDOM.render(<ClassComponent name={"jingyuan"}/> , document.getElementById('root'));

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   element1
// );

