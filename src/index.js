// 关于为什么要导入React? 
// 1. 因为要继承React.Component父类
// 2. 因为编译JSX片段并返回JS对象（虚拟Dom），需要用到React.createElement()方法，需要导入React
// React暴露了createElement和Component
import React from './react';

// 需要用到ReactDOM.render()方法  
import ReactDOM from './react-dom';

class App extends React.Component{
	render(){
		return(
			<h1>Hello, World!</h1>
		)
	}
}

//  ReactDOM.render()方法接收两个参数，第一个参数是虚拟DOM，第二个参数是所要挂载的容器
//  ReactDOM.render()方法的作用就是将虚拟DOM渲染成真实的DOM，并挂载在容器上
ReactDOM.render(
	<App/>,
	document.getElementById('root')
)
