/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-17 11:23:41
 * @LastEditTime: 2022-07-28 22:58:59
 * @LastEditors: yjy
 * @Reference: 
 */
// import React from 'react';
// import ReactDOM from 'react-dom';


import { Component } from './Component.js';
import ReactDOM from './react-dom.js';
import React from './react.js';

const withLoading = (OldComponent) => {
	return class extends React.Component {
		show = () => {
			let loading = document.createElement('div');
			loading.id = 'loading';
			loading.innerHTML = `<p style="width: 100px;height:100px;">loading<p>`;
			document.body.appendChild(loading);
		}
		hide = () => {
			document.getElementById('loading').remove();
		}
		render() {
			return <OldComponent {...this.props} show={this.show} hide={this.hide}></OldComponent>
		}
	}
}

class Panel extends Component {
	render() {
		return <div>
			<button onClick={this.props.show}> 显示 </button>
			<button onClick={this.props.hide}> 隐藏 </button>
		</div>
	}
}

let LoadingPanel = withLoading(Panel);
ReactDOM.render(<LoadingPanel />, document.getElementById('root'));

