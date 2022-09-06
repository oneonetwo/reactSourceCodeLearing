import { Component } from "react";
import RouterContext from "./RouterContext";

class Route extends Component {
    static contextType = RouterContext;
    render() { 
        let { history, location} = this.context;
        let { path, component: RouteComponent } = this.props;
        let match = location.pathname === path;
        let renderElement;
        if (match) { 
            renderElement = <RouteComponent/>;
        }
        return renderElement;
    }
}
export default Route;