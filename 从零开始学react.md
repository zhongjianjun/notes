# React概述

React是一种很好用的前端技术。

它将我们的应用打散成独立小块进行开发，然后组装使用。

react语法课(一)--正式进入react之旅

	var arr = [    
	    <h1>Hello world!</h1>, 
	    <h2>React is awesome</h2>
	
	];//将html装到数组里面
	
	ReactDOM.render(  
	  <div>{arr}</div>,
	  document.getElementById('app'));


怎么样？这样的写法没见过吧！

jsx语法将html，css和js牢牢粘合为一个整体，只有这样，我们才可以谈得上真正意义上的模块化开发。

好啦，有了大体的了解后，我们下面一个一个知识点来讲解。
