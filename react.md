# react笔记

## ES6

ECMAScript 6（以下简称ES6）是JavaScript语言的下一代标准。因为当前版本的ES6是在2015年发布的，所以又称ECMAScript 2015。

也就是说，ES6就是ES2015。

### let, const

这两个的用途与var类似，都是用来声明变量的，但在实际运用中他俩都有各自的特殊用途。

	var name = 'zach'
	
	while (true) {
	    var name = 'obama'
	    console.log(name)  //obama
	    break
	}
	
	console.log(name)  //obama

使用var两次输出都是obama，这是因为ES5**只有全局作用域和函数作用域**，没有块级作用域，这带来很多不合理的场景。第一种场景就是你现在看到的内层变量覆盖外层变量。

而**let则实际上为JavaScript新增了块级作用域**。用它所声明的变量，**只在let命令所在的代码块内有效**。

	let name = 'zach'
	
	while (true) {
	    let name = 'obama'
	    console.log(name)  //obama
	    break
	}
	
	console.log(name)  //zach

另外一个var带来的不合理场景就是**用来计数的循环变量泄露为全局变量**，看下面的例子：

	var a = [];
	for (var i = 0; i < 10; i++) {
	  a[i] = function () {
	    console.log(i);
	  };
	}
	a[6](); // 10


const也用来声明变量，但是声明的是常量。**一旦声明，常量的值就不能改变**。
	
	const PI = Math.PI
	
	PI = 23 //error

当我们尝试去改变用const声明的常量时，浏览器就会报错。

const有一个很好的应用场景，就是当我们**引用第三方库的时声明的变量**，用const来声明**可以避免未来不小心重命名而导致出现bug**：

### class, extends, super

这三个特性涉及了ES5中最令人头疼的的几个部分：原型、构造函数，继承...你还在为它们复杂难懂的语法而烦恼吗？你还在为指针到底指向哪里而纠结万分吗？

ES6提供了更接近传统语言的写法，引入了Class（类）这个概念。新的class写法让对象原型的写法更加清晰、更像面向对象编程的语法，也更加通俗易懂。
	
	class Animal {
		constructor(){
			this.type = 'animal'
		}
		says(say){
			console.log(this.type + 'says' + say)	
		}
	}
	let animal = new Animal()
	animal.says('hello') // animal says hello

	class Cat extends Animal {
		constructor(){
			super()
			this.type = 'cat'
		}
	}
	let cat = new Cat()
	cat.says('hello') //cat says hello

上面代码首先用class定义了一个“类”，可以看到里面有一个**constructor方法，这就是构造方法**，而**this关键字则代表实例对象**。简单地说，**constructor内定义的方法和属性是实例对象自己的，而constructor外定义的方法和属性则是所有实力对象可以共享的。**

Class之间可以通过**extends关键字实现继承**，这比ES5的通过修改原型链实现继承，要清晰和方便很多。上面定义了一个Cat类，该类通过extends关键字，**继承了Animal类的所有属性和方法**。

**super关键字，它指代父类的实例（即父类的this对象）**。子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。**如果不调用super方法，子类就得不到this对象。**

ES6的继承机制，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。

P.S 如果你写react的话，就会发现以上三个东西在最新版React中出现得很多。创建的每个component都是一个继承React.Component的类。

### arrow function

这个恐怕是ES6最最常用的一个新特性了，用它来写function比原来的写法要简洁清晰很多:

	function(i){ return i + 1; } //ES5
	(i) => i + 1 //ES6

但现在我们有了箭头函数，就不需要这么麻烦了：

	class Animal {
	    constructor(){
	        this.type = 'animal'
	    }
	    says(say){
	        setTimeout( () => {
	            console.log(this.type + ' says ' + say)
	        }, 1000)
	    }
	}
	 var animal = new Animal()
	 animal.says('hi')  //animal says hi

当我们使用箭头函数时，函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，它的this是继承外面的，因此内部的this就是外层代码块的this。

### template string

这个东西也是非常有用，当我们要插入大段的html内容到文档中时，传统的写法非常麻烦，所以之前我们通常会引用一些模板工具库，比如mustache等等。

	$("#result").append(
	  "There are <b>" + basket.count + "</b> " +
	  "items in your basket, " +
	  "<em>" + basket.onSale +
	  "</em> are on sale!"
	);

我们要用一堆的'+'号来连接文本与变量，而使用ES6的新特性模板字符串``后，我们可以直接这么来写：

	$("#result").append(`
	  There are <b>${basket.count}</b> items
	   in your basket, <em>${basket.onSale}</em>
	  are on sale!
	`);

用反引号（`）来标识起始，用${}来引用变量，而且所有的空格和缩进都会被保留在输出之中，是不是非常爽？！

### destructuring

ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。