/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-17 11:23:41
 * @LastEditTime: 2022-08-10 22:28:11
 * @LastEditors: yjy
 * @Reference: 
 */
// import React from 'react';
// import ReactDOM from 'react-dom';



import { Component } from './Component.js';
import ReactDOM from './react-dom.js';
import React from './react.js';
class SubCounter extends React.PureComponent {
	render() { 
		console.log('SubCounter render')
		return <div>{ this.props.count }</div>
	}
}

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
			<SubCounter count={ this.state.number}></SubCounter>
		</div>
	}
}
ReactDOM.render(<Counter />, document.getElementById('root'));





