import setAttribute from './dom.jsx';

// render方法的作用是将虚拟DOM渲染成真实DOM
// render方法接收两个参数，第一参数为虚拟DOM，第二个参数为所要挂载的的真实目标DOM
const render = ( vnode, container ) => {
    // 当vnode为字符串时，渲染结果是一段文本
    if ( typeof vnode === 'string' ) {
        // 利用原生DOM操作创建文本节点
        const textNode = document.createTextNode( vnode );
        // 给真实DOM节点添加子元素
        return container.appendChild( textNode );
    }
    // 创建虚拟DOM对应真实DOM的具体元素
    const dom = document.createElement( vnode.tag );
    
    //如果虚拟DOM的属性集合不为空，对属性集合的属性进行操作
    if ( vnode.attrs ) {
        Object.keys( vnode.attrs ).forEach( key => {
            const value = vnode.attrs[ key ];
            // 设置属性
            setAttribute( dom, key, value );   
        } );
    }
    
    // 递归渲染子节点
    vnode.children.forEach( child => render( child, dom ) );   
    
    // 将渲染结果挂载到真正的DOM上
    return container.appendChild( dom );    
}

// 导出render方法接口
export default render;
