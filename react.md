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