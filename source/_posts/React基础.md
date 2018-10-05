---
title: React基础
date: 2018-03-09 08:37:20
tags: React
---
### 起步
```html
<script src="https://cdn.bootcss.com/react/15.4.2/react.min.js"></script>
<script src="https://cdn.bootcss.com/react/15.4.2/react-dom.min.js"></script>
<script src="https://cdn.bootcss.com/babel-standalone/6.22.1/babel.min.js"></script>
<script>
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('example')
);
</script>
```
### JSX
React 使用 JSX 来替代常规的 JavaScript。JSX中有如下注意点：
* 变量需要包含在`{}`中
* 不能使用`if else`，可以使用三元表达式来替代
* 注释需要写在花括号中
* JSX 允许在模板中插入数组，数组会自动展开所有成员
* 在添加属性时， class 属性需要写成 className ，for 属性需要写成 htmlFor ，因为 class 和 for 是 JavaScript 的保留字
* 组件类只能包含一个顶层标签
```js
var myStyle = {
  fontSize: 100,
  color: '#FF0000'
};
var arr = [
  <h1>菜鸟教程</h1>,
  <h2>学的不仅是技术，更是梦想！</h2>,
];
ReactDOM.render(
  <div>
  <h1>{1 + 2}</h1>
  <h2>{i == 1 ? 'True!' : 'False'}</h2>
  <p style = {myStyle}>react is cool!</p>
  <p>{arr}</p>
  {/*注释...*/}
  </div>
  ,
  document.getElementById('example')
);
```
React 可以渲染 HTML 标签 (strings) 或 React 组件 (classes)。React 的 JSX 使用大、小写的约定来区分本地组件的类和 HTML 标签。
要渲染 HTML 标签，只需在 JSX 里使用**小写字母**的标签名。
```js
var myDivElement = <div className="foo" />;
ReactDOM.render(myDivElement, document.getElementById('example'));
```
要渲染 React 组件，只需创建一个**大写字母开头**的本地变量。
```js
var MyComponent = React.createClass({/*...*/});
var myElement = <MyComponent someProperty={true} />;
ReactDOM.render(myElement, document.getElementById('example'));
```
<!-- more -->
### 组价
React.createClass 方法用于生成一个组件类。如果我们需要向组件传递参数，可以使用 this.props 对象。
```js
var WebSite = React.createClass({
  render: function() {
    return (
      <div>
        <Name name={this.props.name} />
        <Link site={this.props.site} />
      </div>
    );
  }
});
 
var Name = React.createClass({
  render: function() {
    return (
      <h1>{this.props.name}</h1>
    );
  }
});
 
var Link = React.createClass({
  render: function() {
    return (
      <a href={this.props.site}>
        {this.props.site}
      </a>
    );
  }
});
 
ReactDOM.render(
  <WebSite name="菜鸟教程" site=" http://www.runoob.com" />,
  document.getElementById('example')
);
```
### State
React 把组件看成是一个状态机（State Machines）。通过与用户的交互，实现不同状态，然后渲染 UI，让用户界面和数据保持一致。
以下实例中创建了 LikeButton 组件，getInitialState 方法用于定义初始状态，也就是一个对象，这个对象可以通过 this.state 属性读取。当用户点击组件，导致状态变化，this.setState 方法就修改状态值，每次修改以后，自动调用 this.render 方法，再次渲染组件。
```js
var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? '喜欢' : '不喜欢';
    return (
      <p onClick={this.handleClick}>
        你<b>{text}</b>我。点我切换状态。
      </p>
    );
  }
});

ReactDOM.render(
  <LikeButton />,
  document.getElementById('example')
);
```
### Props
state 和 props 主要的区别在于 props 是不可变的，而 state 可以根据与用户交互来改变。
你可以通过 getDefaultProps() 方法为 props 设置默认值，
```js
var HelloMessage = React.createClass({
  getDefaultProps: function() {
    return {
      name: 'Runoob'
    };
  },
  render: function() {
    return <h1>Hello {this.props.name}</h1>;
  }
});
 
ReactDOM.render(
  <HelloMessage />,
  document.getElementById('example')
);
```
