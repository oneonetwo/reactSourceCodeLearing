/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-09-04 15:49:43
 * @LastEditTime: 2022-09-04 16:35:24
 * @LastEditors: yjy
 * @Reference: 
 */
import { Component } from "react";
import { Router } from "../react-router";
import { createHashHistory } from '../history';

class HashRouter extends Component { 
    constructor(props) { 
        super(props);
        this.history = createHashHistory();
    }
    render() { 
        return (<Router history={ this.history}>
            { this.props.children }
        </Router>)
    }
}
export default HashRouter;