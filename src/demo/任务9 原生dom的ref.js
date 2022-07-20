/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-17 11:23:41
 * @LastEditTime: 2022-07-20 23:46:23
 * @LastEditors: yjy
 * @Reference: 
 */
// import React from 'react';
// import ReactDOM from 'react-dom';

import { Component } from './Component.js';
import ReactDOM from './react-dom.js';
import React from './react.js';



/**
 * setState可能是异步的
 */
class Counter extends Component {
  numberA;
  numberB;
  result;
  constructor(props) {
    super(props);
    this.numberA = React.createRef();
    this.numberB = React.createRef();
    this.result = React.createRef();
  }
  
  handleClick = () => {
    //回调是在更新后执行的
    let numberA = this.numberA.current.value;
    let numberB = this.numberB.current.value;
    this.result.current.value = parseFloat(numberA) + parseFloat(numberB);
  }
  render() { 
    return <div>
      <input ref={ this.numberA}></input>
      <input ref={ this.numberB}></input>
      <button onClick={ this.handleClick}> + </button>
      <br />
      <input ref={ this.result}></input>
    </div>
  }
}



ReactDOM.render(<Counter />, document.getElementById('root'));

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   element1
// );

