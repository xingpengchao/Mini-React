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
    
     // 定义原型方法setState，用于改变状态
	setState(stateChange){
		enqueueSetState(stateChange, this);
	}
}

 // 导出组件基类/父类Component接口 
export default Component;