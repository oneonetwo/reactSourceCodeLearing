import { wrapToVdom } from "./utils";


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
}

export default React;