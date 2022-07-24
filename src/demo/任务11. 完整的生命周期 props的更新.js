/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-17 11:23:41
 * @LastEditTime: 2022-07-23 14:56:29
 * @LastEditors: yjy
 * @Reference: 
 */
// import React from 'react';
// import ReactDOM from 'react-dom';


import { Component } from './Component.js';
import ReactDOM from './react-dom.js';
import React, { createRef, forwardRef } from './react.js';

class ChildCounter extends Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		console.log('ChildCounter 1.componentWillMount');
	}

	render() {
		console.log('childCounter 2.render');
		return <div>{this.props.count}</div>
	}
	componentDidMount() {
		console.log('childCounter 3.componentDidMount');
	}
	shouldComponentUpdate(nextProps,nextState) {
		return nextProps.count % 3 === 0;//如果是3的倍数就更新，否则不更新。
	}
	componentWillReceiveProps() {
		console.log('childCounter 4.componentWillReceiveProps');
	}
	componentWillUnmount() {
		console.log('childCounter 5.componentWillUnmount');
	}

}

class Counter extends Component {
	constructor(props) {
		super(props);
		this.state = { number: 0 }; //设置默认状态
		console.log('Couner 1. constructor');
	}
	componentWillMount() {
		console.log('Counter 2. componentWillMount');
	}
	handleClick = (enent) => {
		this.setState({ number: this.state.number + 1 });
	}
	//setState会引起状态的变化，父组件更新的时候，会让子组件的属性发生变化。
	//当属性或者状态发生拜年话的话，决定是否渲染更新
	shouldComponentUpdate(nextProps, nextState) {
		console.log('couner 5.shouleComponentUpdate');
		return nextState.number % 2 === 0;//奇数不更新，偶数个更新。
	}
	componentWillUpdate() {
		console.log('Counter 6.componentWillUpdate')
	}
	componentDidUpdate() {
		console.log('Counter 7.conponentDidUpdate')
	}
	render() {
		console.log('Counter 3. render')
		return <div id={ this.state.number }>
			<p>Counter: {this.state.number}</p>
			{this.state.number === 4 ? null : <ChildCounter count={this.state.number} />}
			<button onClick={this.handleClick}> + </button>
		</div>
	}
	componentDidMount() {
		console.log('Couner 4. componentDidMount');
	}
}

ReactDOM.render(<Counter />, document.getElementById('root'));

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   element1
// );

