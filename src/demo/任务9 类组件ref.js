/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-17 11:23:41
 * @LastEditTime: 2022-07-21 00:01:16
 * @LastEditors: yjy
 * @Reference: 
 */
// import React from 'react';
// import ReactDOM from 'react-dom';

import { Component } from './Component.js';
import ReactDOM from './react-dom.js';
import React, { createRef } from './react.js';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
  }
  getFocus = () => {
    this.inputRef.current.focus();
  }
  render() {
    return <input ref={this.inputRef}></input>
  }
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.textInputRef = createRef();
  }
  getInputFocus = () => {
    // this.formRef.current指向类组件的实例
    this.textInputRef.current.getFocus();
  }
  render() {
    return (
      <div>
        <TextInput ref={this.textInputRef}></TextInput>
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

