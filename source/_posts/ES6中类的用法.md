---
title: ES6中类的用法
date: 2018-02-28 20:29:45
tags: ES6
---
ES6引入了Class（类）这个概念,作为对象的模板,通过class关键字,可以定义类。class不存在变量提升。
```
let methodName = "getInfo"; 
class Person{  
    // constructor方法是类的构造函数是默认方法
    constructor (x,y) {
    	// ES6实例属性只能在constructor构造函数中定义  
        this.x = x;  
        this.y = y;  
    }
    // 注意！方法之间不需要逗号分隔！
 	// toString方法是Person类内部定义的方法，ES6中它是不可枚举的，但ES5中可以枚举。
    toString () {  
        return (this.x + "的年龄是" +this.y+"岁");  
    }
	// 在ES6中,类的属性名可以使用表达式
    [methodName] () {  
       console.log('输出' + this.x + '的基本信息');  
    }
	// static关键字，就表示该方法为“静态方法”，实例无法调用，只能类自身调用
    static getCommon(){  
        return '父类的静态方法';  
    }
}

// 在类的原型上追加方法
Object.assign(Person.prototype, {
    getWeight(){  
        console.log('71kg');  
    },  
    getHeight(){  
        console.log('175cm');  
    }  
}); 

// 定义静态属性，目前ES6，只有这种写法可行，因为ES6明确规定，Class内部只有静态方法，没有静态属性。
Person.firstName = 'pca';  

let tom = new Person('tom', 23);
tom.getInfo();
tom.getWeight();
```
