import { Component } from 'react';
import RouterContext from './RouterContext';

class Router extends Component { 
    constructor(props) { 
        super(props);
        this.state = {
            location: props.history.location,
        }
        //监听路径变化，当路径发生变化后执行回调，并传入最新的路径
        this.unlisten = props.history.listen(location => { 
            this.setState({location}) //状态变化引起组件的更新。
        })
    }
    componentWillUnmount() { 
        this.unlisten();
    }
    render() { 
        let value = {
            location: this.state.location,
            history: this.props.history,
        };
        return <RouterContext.Provider value={value}>
            { this.props.children }
        </RouterContext.Provider>
    }
   
}
export default Router;