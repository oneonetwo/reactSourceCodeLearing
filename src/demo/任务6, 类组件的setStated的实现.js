// import React from 'react';
// import ReactDOM from 'react-dom';

import ReactDOM from './react-dom.js';
import React from './react.js';



/**
 * setState可能是异步的
 */
class Counter extends Component {
  state = { number: 0 }
  handleClick = () => {
    //回调是在更新后执行的
    this.setState({ number: this.state.number + 1 }, () => {
      
    })
    console.log(this.state.number);
  }
  render() { 
    return <div>
      <p>{ this.state.number }</p>
      <button onClick={ this.handleClick}> + </button>
    </div>
  }
}



ReactDOM.render(<Counter />, document.getElementById('root'));

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   element1
// );

