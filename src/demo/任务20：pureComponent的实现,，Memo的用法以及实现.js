/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-17 11:23:41
 * @LastEditTime: 2022-08-11 08:31:09
 * @LastEditors: yjy
 * @Reference: 
 */
// import React from 'react';
// import ReactDOM from 'react-dom';



import { Component } from './Component.js';
import ReactDOM from './react-dom.js';
import React from './react.js';

//类组件
class SubCounter extends React.PureComponent {
	render() { 
		console.log('SubCounter render')
		return <div>{ this.props.count }</div>
	}
}
//函数组件 react.memo的用法
function SubCounterFun(props) {
	console.log('SubCounter render')
	return <div>{ props.count }</div>
}

// let MemoSubCounter = React.memo(SubCounterFun, (preProps, nextProps) => { 
// 	//memo的第二个参数 用来深度比较props新旧props的值
// 	return JSON.stringify(perProps) === JSON.stringify(nextProps);
// })
let MemoSubCounter = React.memo(SubCounterFun)
class Counter extends Component { 
	state = { number: 0 }
	inputRef = React.createRef();
	handleChilck = (e) => { 
		let amount = Number(this.inputRef.current.value);
		this.setState({number: this.state.number + amount});
	}
	render() { 
		console.log('Counter render')
		return <div>
			<p>{this.state.number}</p>
			<input ref={ this.inputRef } />
			<button onClick={this.handleChilck}> + </button>
			<MemoSubCounter count={ this.state.number}></MemoSubCounter>
		</div>
	}
}
ReactDOM.render(<Counter />, document.getElementById('root'));





