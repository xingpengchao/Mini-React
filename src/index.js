// 关于为什么要导入React? 
// 1. 因为要继承React父类
// 2. 因为将JSX片段编译并返回JS对象也就是虚拟Dom，需要用到React.createElement()方法，需要导入React
// React暴露了createElement和Component
import React from './react';

// 需要用到ReactDOM.render()方法  
// ReactDOM暴露了唯一的render方法
import ReactDOM from './react-dom';

class App extends React.Component{
	render(){
		return(
			<h1>Hello, World!</h1>
		)
	}
}

//  render方法接收两个参数，第一个参数为虚拟DOM，第二个参数是所要挂载的容器
//  render方法的作用就是将虚拟DOM渲染成真实的DOM
ReactDOM.render(
	<App/>,
	document.getElementById('root')
)
