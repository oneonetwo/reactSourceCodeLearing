// import React from 'react';
// import ReactDOM from 'react-dom';

import ReactDOM from './react-dom.js';
import React from './react.js';

//函数调用依赖上一次的值
let queue1 = [];
queue1.push((state) => ({ number: state.number + 1 }));
queue1.push((state) => ({ number: state.number + 1 }));
let result = queue1.reduce((newState, action) => { 
  return action(newState);
}, { number: 0 })
console.log(result)

/**
 * setState可能是异步的
 */
class Counter extends Component {
  state = { number: 0 }
  handleClick = () => { 
    setState({ number: this.state.number + 1 })
    console.log(state.number); //0
    setState({ number: this.state.number + 1 });
    console.log(state.number); //0

    setTimeout(() => { 
      setState({ number: this.state.number + 1 });
      console.log(state.number); //2
      setState({ number: this.state.number + 1})
      console.log(state.number); //3
    })
  }
}

/**
 * 模拟setState的批量更新 start
 */
let isBatchingUpdate = true;//再生命周期函数执行前设置未true,之后设置为false
let queue = [];
let state = { number: 0 };
function setState(newState) { 
  if (isBatchingUpdate) {
    queue.push(newState);
  } else { 
    state = { ...state, ...newState };
  }
}
function handleClick() { 
  isBatchingUpdate = true;
  //自己的逻辑开始
  setState({ number: state.number+1 });
  console.log(state);
  setState({ number: state.number+1 });
  console.log(state);
  //自己的逻辑结束
  state = queue.reduce((newState, action) => {
    return {...newState, ...action};
  }, state)
}
handleClick();
console.log(state);





/** 
 *类组件的数据主要来源有两个地方，父组件传过来的属性，自己内部的状态
 *属性和状态发生变化后组件都会更新，视图都会渲染。
 */ 
class Clock extends React.Component { 
  constructor(props) { 
    super(props);
    this.state = {
      date: new Date()
    }
  }
  comp
  render() { 
    return <div>
      <h1>Hello World</h1>
      <h2>现在时间是: { this.state.data.toLocaleTimeString()}</h2> 
    </div>
  }
}

ReactDOM.render(<Clock/>, document.getElementById('root'));

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   element1
// );

