/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-17 11:23:41
 * @LastEditTime: 2022-08-02 08:10:41
 * @LastEditors: yjy
 * @Reference: 
 */
// import React from 'react';
// import ReactDOM from 'react-dom';


import { Component } from './Component.js';
import ReactDOM from './react-dom.js';
import React from './react.js';

let ThemeContext = React.createContext();
let { Provider, Consumer } = ThemeContext;

class Content extends Component {
	static contextType = ThemeContext;
	render() {
		return <div style={{ margin: '10px', border: `5px solid ${this.context.color}`, padding: '5px', width: '200px' }}>
			内容
			<button onClick={() => this.context.changeColor('red')}>变红</button>
			<button onClick={() => this.context.changeColor('green')}>变绿</button>
		</div>
	}
}
class Main extends Component {
	static contextType = ThemeContext;
	render() {
		return <div style={{ margin: '10px', border: `5px solid ${this.context.color}`, padding: '5px', width: '200px' }}>
			主体
			<Content></Content>
		</div>
	}
}
class Title extends Component {
	static contextType = ThemeContext;
	render() {
		return <div style={{ margin: '10px', border: `5px solid ${this.context.color}`, padding: '5px', width: '200px' }}>
			标题
		</div>
	}
}

// class Header extends Component { 
// 	static contextType = ThemeContext;
// 	render() { 
// 		return <div style={{ margin: '10px', border: `5px solid ${this.context.color}`, padding: '5px', width: '200px' }}>
// 				头部
// 				<Title></Title>
// 			</div>
// 	}
// }

function Header() {
	return <Consumer>
		{
			value => <div style={{ margin: '10px', border: `5px solid ${value.color}`, padding: '5px', width: '200px' }}>
				头部
				<Title></Title>
			</div>
		}
	</Consumer>
}


class Page extends Component {
	constructor(props) {
		super(props);
		this.state = { color: 'red' };
	}
	changeColor = (color) => {
		this.setState({ color });
	}
	render() {
		let value = { color: this.state.color, changeColor: this.changeColor }
		return <Provider value={value}>
			<div style={{ margin: '10px', border: `5px solid ${this.state.color}`, padding: '5px', width: '200px' }}>
				主页
				<Header></Header>
				<Main></Main>
			</div>
		</Provider>
	}
}


ReactDOM.render(<Page />, document.getElementById('root'));

