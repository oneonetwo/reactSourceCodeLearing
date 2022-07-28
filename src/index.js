/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-17 11:23:41
 * @LastEditTime: 2022-07-29 00:08:27
 * @LastEditors: yjy
 * @Reference: 
 */
// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';


import { Component } from './Component.js';
import ReactDOM from './react-dom.js';
import React from './react.js';
//基于反向继承：拦截生命周期 state 渲染过程
//假如我们有一个第三方的组件库
class Button extends Component { 
	state = { name: '张三' }
	componentWillMount(){ 
		console.log('Button componentWillMount');
	}	
	componentDidMount() { 
		console.log('Button componentDidMount');
	}
	render() {
		console.log('Button render');
		return <button name={this.state.name}> { this.props.title }</button>
	}
}

const wrapper = oldComponent => { 
	return class extends oldComponent {
		state = { number: 0 };
		componentWillMount() { 
			console.log('wrapper componentWillMount');
			super.componentWillMount();
		}
		componentDidMount() { 
			console.log('wrapper componentDidMount');
			super.componentDidMount();
		}
		handleClick = () => { 
			this.setState({ number: this.state.number + 1 });
		}
		render() { 
			let element = super.render();
			let cloneElement = React.cloneElement(element, {
				...super.props,
				onClick: this.handleClick,
			}, this.state.number);
			return cloneElement;
		}
	}
}

const WrapperComponent = wrapper(Button); 

ReactDOM.render(<WrapperComponent />, document.getElementById('root'));

