import {diff} from './diff.jsx';

// render方法的作用是将虚拟DOM渲染成真实DOM，并挂载到容器上
// render方法接收两个参数，第一参数为虚拟DOM，第二个参数为所要挂载的容器
const render = (vnode, container) => {
    // 将打补丁后的真实DOM挂载到容器上
    let dom = diff(dom, vnode, container);
    return container.appendChild(dom);
} 

const _render = ( vnode, container ) => {
    // 当虚拟DOM为空，终止函数
    if ( vnode === undefined ) return;
    
    // 当虚拟DOM是组件
    if ( vnode.isReactComponent ) {
        const component = vnode;
        // 判断组件是否已挂载在DOM上
        if ( component._container ) {
            // 组件已挂载且有componentWillUpdate()方法，调用方法
            if ( component.componentWillUpdate ) {
                component.componentWillUpdate();
            }
            // 组件未挂载且有componentWillMount()方法，调用方法
        } else if ( component.componentWillMount ) {
            component.componentWillMount();
        }
        
         // 保存父容器信息，用于更新
        component._container = container;  
         
        vnode = component.render();
    }
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
            // 如果是属性集合的属性名是类名，直接设置其属性值
            if ( key === 'className' ) key = 'class';

            // 如果属性值是事件监听函数，则直接附加到dom上
            if ( typeof value === 'function' ) {
                dom[ key.toLowerCase() ] = value;
            } else {
                // 其他情况调用setAttribute方法设置属性
                dom.setAttribute( key, vnode.attrs[ key ] );
            }  
        } );
    }
    
    // 递归渲染子节点
    if(vnode.children){
        vnode.children.forEach( child => _render( child, dom ) );   
    }
    
    // 将真实DOM挂载到容器上
    return container.appendChild(dom);    
}


export default render;
