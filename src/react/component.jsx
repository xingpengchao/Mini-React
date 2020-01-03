import { enqueueSetState } from './set-state-queue.jsx';

// 定义React组件基类/父类
class Component{
	constructor(props ={}){
		// 用于判断是否为类组件
		this.isReactComponent = true;
		// 初始化实例属性props和state
		this.props = props;
		this.state = {};
	}
    
     // 定义原型方法setState，用于改变状态state
     // stateChange可以是对象，也可以是函数 
	setState(stateChange){
		enqueueSetState(stateChange, this);
	}
}

export default Component;