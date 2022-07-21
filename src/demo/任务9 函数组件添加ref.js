/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-17 11:23:41
 * @LastEditTime: 2022-07-21 00:33:14
 * @LastEditors: yjy
 * @Reference: 
 */
// import React from 'react';
// import ReactDOM from 'react-dom';


import { Component } from './Component.js';
import ReactDOM from './react-dom.js';
import React, { createRef, forwardRef } from './react.js';

function TextInput(props, ref) { 
  return <input ref={ref} />
}
const InputForWrad = forwardRef(TextInput);

class Form extends Component {
  constructor(props) {
    super(props);
    this.textInputRef = createRef();
  }
  getInputFocus = () => {
    // this.formRef.current指向类组件的实例
    console.log('this.textInputRef.current', this.textInputRef.current);
    this.textInputRef.current.focus();
  }
  render() {
    return (
      <div>
        <InputForWrad ref={this.textInputRef}></InputForWrad>
        <button onClick={this.getInputFocus}>获取焦点</button>
      </div>
    )
  }
}

ReactDOM.render(<Form />, document.getElementById('root'));

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   element1
// );

