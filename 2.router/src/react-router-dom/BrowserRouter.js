/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-09-04 15:49:43
 * @LastEditTime: 2022-09-04 16:33:51
 * @LastEditors: yjy
 * @Reference: 
 */
import { Component } from "react";
import { Router } from "../react-router";
import { createBrowserHistory } from '../history';
class BrowerRouter extends Component { 
    constructor(props) { 
        super(props);
        this.history = createBrowserHistory();
    }
    render() { 
        return (<Router history={ this.history}>
            { this.props.children }
        </Router>)
    }
}
export default BrowerRouter;