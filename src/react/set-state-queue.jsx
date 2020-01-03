import { renderComponent } from '../react-dom/diff'

const setStateQueue = [];  // 存储setState的队列 
const renderQueue = [];  // 渲染组件队列

// 异步清空队列，使用JS事件循环机制实现，具体使用Promise.resolve().then()包裹清空队列的方法，生成微任务，
// 执行步骤是同步任务执行完成后执行微任务，达到异步清空队列的效果，这是实现异步setState的关键  
function defer( fn ) {
    return Promise.resolve().then( fn );
}

export function enqueueSetState( stateChange, component ) {

    // setState存储队列为空，异步清空存储队列并渲染组件
    if ( setStateQueue.length === 0 ) {
        defer( flush );
    }
    // 否则，将每次setState数据push进队列
    setStateQueue.push( {
        stateChange,
        component
    } );

    // 与渲染组件队列中组件不重复，将组件push进队列
    if ( !renderQueue.some( item => item === component ) ) {
        renderQueue.push( component );
    }
}

// 清空队列方法
function flush() {
    let item, component;

    // 清空setState存储队列，直至队列为空
    while( item = setStateQueue.shift() ) {

        const { stateChange, component } = item;

        // 如果没有prevState，则将当前的state作为初始的prevState
        if ( !component.prevState ) {
            component.prevState = Object.assign( {}, component.state );
        }

        // 如果stateChange是一个函数，也就是setState的第二种形式
        if ( typeof stateChange === 'function' ) {
            Object.assign( component.state, stateChange( component.prevState, component.props ) );
        } else {
            // 如果stateChange是一个对象，则直接合并到setState中
            Object.assign( component.state, stateChange );
        }
        
        component.prevState = component.state;

    }

    // 清空渲染组件队列，直至队列为空 
    while( component = renderQueue.shift() ) {
        // 渲染组件方法
        renderComponent( component );
    }

}