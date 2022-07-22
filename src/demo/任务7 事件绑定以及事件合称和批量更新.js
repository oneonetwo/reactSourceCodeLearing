/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-17 11:23:41
 * @LastEditTime: 2022-07-20 22:23:21
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
  state = { number: 0 }
  handleClick = () => {
    //回调是在更新后执行的
    this.setState({ number: this.state.number + 1 })
    console.log(this.state.number); //0
    this.setState({ number: this.state.number + 1 })
    console.log(this.state.number); //0
    setTimeout(() => { 
      this.setState({ number: this.state.number + 1 });
      console.log(this.state.number);//2
      this.setState({ number: this.state.number + 1 });
      console.log(this.state.number);//3

    })
  }
  render() { 
    return <div>
      <p>{ this.state.number }</p>
      <button onClick={ this.handleClick}> + </button>
    </div>
  }
}



ReactDOM.render(<Counter />, document.getElementById('root'));

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   element1
// );

