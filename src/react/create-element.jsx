import Component from './component.jsx'

/*createElement方法用于编译JSX并返回JS对象，返回的JS对象记录了该标签的所有DOM信息，也就是虚拟DOM。
createElement方法接收三个参数：
第一个参数是DOM节点标签，比如div、h1、span等等;
第二个参数是一个对象，表示属性集合，包含了标签的所有属性，比如className、id、style等等；
第三个参数是一个数组，使用扩展运算符将child1、child2一些列子节点合并成的一个数组children；*/

function createElement( tag, attrs, ...children ) {

	attrs = attrs || {};
    // 返回一个JS对象，就是虚拟Dom
    return {
        tag,
        attrs,
        children,
        key: attrs.key || null 
    }
}


export default createElement;