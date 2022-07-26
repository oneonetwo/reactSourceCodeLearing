/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-17 11:23:41
 * @LastEditTime: 2022-07-26 08:28:20
 * @LastEditors: yjy
 * @Reference: 
 */
// import React from 'react';
// import ReactDOM from 'react-dom';


import { Component } from './Component.js';
import ReactDOM from './react-dom.js';
import React, { createRef, forwardRef } from './react.js';

class ScrollList extends Component { 
	constructor(props) {
		super(props);
		this.state = { messages: [] };
		this.wrapper = React.createRef();
	}
	addMessage = () => {
		this.setState(state => ({
			messages: [state.messages.length, ...state.messages]
		}));
	}
	componentDidMount() {
		this.timer = setInterval(() => {
			this.addMessage();
		}, 1000);
	}
	componentWillUnmount() {
		clearInterval(this.timer);
	}
	getSnapshotBeforeUpdate() {
		return {
			prevScrollTop: this.wrapper.current.scrollTop,//更新前向上卷去的高度 50
			prevScrollHeight: this.wrapper.current.scrollHeight//更新内容的高度 200
		}
	}
	componentDidUpdate(prevProps, prevState, { prevScrollTop, prevScrollHeight }) {
		this.wrapper.current.scrollTop = prevScrollTop + (this.wrapper.current.scrollHeight - prevScrollHeight);
	}

	render() {
		let style = {
			height: '100px',
			width: '200px',
			border: '1px solid red',
			overflow: 'auto'
		}
		return (
			<div style={style} ref={this.wrapper}>
				{
					this.state.messages.map((message, index) => {
						return <div key={index}>{message}</div>
					})
				}
			</div>
		)
	}
}

ReactDOM.render(<ScrollList />, document.getElementById('root'));

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   element1
// );

