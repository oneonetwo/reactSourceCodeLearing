/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-17 11:23:41
 * @LastEditTime: 2022-08-04 08:20:56
 * @LastEditors: yjy
 * @Reference: 
 */
// import React from 'react';
// import ReactDOM from 'react-dom';



import { Component } from './Component.js';
import ReactDOM from './react-dom.js';
import React from './react.js';

class MouseTracker extends React.Component {
	state = {
		x: 0,
		y: 0
	}
	handleMove = (event) => {
		this.setState({
			x: event.clientX,
			y: event.clientY
		})
	}
	render() { 
		return <div onMouseMove={this.handleMove}>
			{/* { this.props.children[0](this.state) } */}
			{ this.props.render(this.state)}
		</div>	
	}
}
const Welcome = props => { 
	return <div>
			<h1>移动鼠标</h1>
			<p>当前鼠标的位置：x={props.x}, y={props.y}</p>
			<h2>口号：{ props.ss}</h2>	
		</div>
}
function withTracker(OldComponent) { 
	return class extends Component { 
		state = {
		x: 0,
		y: 0
	}
	handleMove = (event) => {
		this.setState({
			x: event.clientX,
			y: event.clientY
		})
	}
	render() { 
		return <div onMouseMove={this.handleMove}>
			<OldComponent {...this.state} {...this.props} /> 
		</div>	
	}
	} 
}
// 1.children 的写法  是个函数
// ReactDOM.render(<MouseTracker>
// 	{
// 		(props) => <div>
// 			<h1>移动鼠标</h1>
// 			<p>当前鼠标的位置：x={props.x}, y={props.y}</p>
// 		</div>
// 	}
// </MouseTracker>, document.getElementById('root'));
// 2. renderProps的写法
// ReactDOM.render(<MouseTracker render={
// 		(props) => <div>
// 			<h1>移动鼠标</h1>
// 			<p>当前鼠标的位置：x={props.x}, y={props.y}</p>
// 		</div>
// 	} />, document.getElementById('root'));
//3.高阶函数的写法
let Tracker = withTracker(Welcome);
ReactDOM.render(<Tracker ss={ '长江后浪退前浪，一浪更比一辆强' } />, document.getElementById('root'));


