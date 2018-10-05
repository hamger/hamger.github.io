---
title: TypeScript学习
date: 2018-03-10 12:26:20
tags: TypeScript
---
TypeScript 是 JavaScript 的超集。
TypeScript 最大的特点就是类型检查，这和[flow](https://flow.org/en/)很相似，Vue 源码使用 flow 作为类型检查 ，但 React 使用的是 TypeScitpt。
TypeScript 和 ES6 有一些相同的地方，这里不再赘述。

### 基础类型
#### 基本类型
```typescript
let isDone: boolean = false;
let age: number = 37;
let sentence: string = `Hello, my name is Hanger.`
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
let u: undefined = undefined;
let n: null = null;
```
注意，**基本类型**首字母都是小写的。
默认情况下`null`和`undefined`是所有类型的子类型。就是说你可以把 `null`和`undefined`赋值给number类型的变量。

#### 元祖Tuple
```typescript
let x: [string, number]; // 定义一个元祖类型
x = ['hello', 10]; // OK
x = [10, 'hello']; // Error
x[2] = 'world'; // OK, 该值属于(string | number)类型
x[3] = true; // Error, 该值不属于(string | number)类型
```

#### 枚举
enum 类型是对JavaScript标准数据类型的一个补充，使用枚举类型可以为一组数值赋予友好的名字。
默认从0开始为元素编号，也可以手动的指定成员的数值。
```typescript
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];
alert(colorName);  // 'Green'
```

<!-- more -->
#### Any
any类型包括任意类型。
```typescript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // OK
```

#### Void
void类型表示没有任何类型。
```typescript
function warnUser(): void {
  alert("This is my warning message");
}
```
声明一个void类型的变量作用不大，因为你只能为它赋予`undefined`和`null`：
```typescript
let unusable: void = undefined;
```
#### Never
never类型表示的是那些永不存在的值的类型。never类型是任何类型的子类型，且没有类型是never的子类型。
```typescript
function error(message: string): never {
  throw new Error(message);
}
function infiniteLoop(): never {
  while (true) {
  }
}
```

#### 类型断言
类型断言好比其它语言里的类型转换，但不进行特殊的数据检查和解构。
```typescript
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length; // 形式一：尖括号
let strLength: number = (someValue as string).length; // 形式二：as 语法
```

### 泛型
下面的 identity 函数就是一个泛型。
```typescript
function identity<T>(arg: T): T {
  return arg;
}
```
给`identity`添加了类型变量`T`。 `T`帮助捕获用户传入的类型，同时也会当做返回值类型。保证参数类型与返回值类型是相同的。 这允许我们跟踪函数里使用的类型的信息。
泛型函数可以有两种使用方法
```typescript
let output = identity<string>("myString");
let output = identity("myString"); // 利用了TypeScript里的类型推论
```

### 高级类型
#### 交叉类型
交叉类型是多个类型的交集。
```typescript
Person & Serializable & Loggable
```
#### 联合类型
联合类型是多个类型的并集。 
```typescript
number | string | boolean
```