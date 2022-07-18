import { wrapToVdom } from "./utils";
import { Component }  from "./Component.js";

export function createElement(type, props, ...children) {
     return {
         type,
         props: {
             ...props,
             children: children.map(child => {
                 return typeof child === 'object'
                     ? child
                     : wrapToVdom(child);
             })
         }
     }
}

const React = {
    createElement,
    Component,
}

export default React;