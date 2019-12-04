import Component from './component.jsx'

function createElement( tag, attrs, ...children ) {
    // 返回一个JS对象，就是虚拟Dom
    return {
        tag,
        attrs,
        children
    }
}

export default createElement;