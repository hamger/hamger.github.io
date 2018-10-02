---
title: React基础2
date: 2018-03-09 08:37:59
tags: React
---
### React 组件 API
React 组件 API 中有以下7个常用方法:
* 设置状态：setState
* 替换状态：replaceState
* 设置属性：setProps
* 替换属性：replaceProps
* 强制更新：forceUpdate
* 获取DOM节点：findDOMNode
* 判断组件挂载状态：isMounted

#### setState
```
setState(nextState[, callback])
```
* nextState：一个对象。将要设置的新状态，该状态会和当前的state合并
* callback：回调函数。该函数会在setState设置成功，且组件重新渲染后调用

#### replaceState
```
replaceState(nextState[, callback])
```
* nextState：一个对象。将要设置的新状态，该状态会替换当前的state。
* callback：回调函数。该函数会在replaceState设置成功，且组件重新渲染后调用。

#### setProps
```
setProps(nextProps[, callback])
```
* nextProps：一个对象。将要设置的新属性，该状态会和当前的props合并
* callback：回调函数。该函数会在setProps设置成功，且组件重新渲染后调用

#### replaceProps
```
replaceProps(nextProps[, callback])
```
* nextProps：一个对象。将要设置的新属性，该属性会替换当前的props。
* callback：回调函数。该函数会在replaceProps设置成功，且组件重新渲染后调用。

#### forceUpdate
```
forceUpdate([callback])
```
* callback：回调函数。该函数会在组件render()方法调用后调用。

forceUpdate()方法会使组件和子组件调用自身的render()方法重新渲染组件。但是，组件重新渲染时，依然会读取this.props和this.state，如果状态没有改变，那么React只会更新DOM。

一般来说，应该尽量避免使用forceUpdate()，而仅从this.props和this.state中读取状态并由React触发render()调用。
#### findDOMNode
```
DOMElement findDOMNode()
```
如果组件已经挂载到DOM中，该方法返回对应的本地浏览器 DOM 元素。当render返回null 或 false时，this.findDOMNode()也会返回null。

#### isMounted
```
bool isMounted()
```
返回值：true或false，表示组件是否已挂载到DOM中。可以使用该方法保证了setState()和forceUpdate()在异步场景下的调用不会出错。

<!-- more -->
### 组价生命周期
组件的生命周期可分成三个状态：
* Mounting：已插入真实 DOM
* Updating：正在被重新渲染
* Unmounting：已移出真实 DOM

#### 生命周期的方法
* componentWillMount： 在渲染前调用, 在客户端也在服务端。
* componentDidMount：在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。
* componentWillReceiveProps：在组件接收到一个新的 prop 时被调用。这个方法在初始化render时不会被调用。
* shouldComponentUpdate：返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。 
* componentWillUpdate：在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。
* componentDidUpdate：在组件完成更新后立即调用。在初始化时不会被调用。
* componentWillUnmount：在组件从 DOM 中移除的时候立刻被调用。

具体见[官方文档(中文)](https://doc.react-china.org/)

#### 生命周期的实例
```
var Button = React.createClass({
  getInitialState: function() {
    return {
      data:0
    };
  },
  setNewNumber: function() {
    this.setState({data: this.state.data + 1})
  },
  render: function () {
    return (
      <div>
        <button onClick = {this.setNewNumber}>INCREMENT</button>
        <Content myNumber = {this.state.data}></Content>
      </div>
    );
  }
});
var Content = React.createClass({
  componentWillMount:function() {
    console.log('Component WILL MOUNT!')
  },
  componentDidMount:function() {
    console.log('Component DID MOUNT!')
  },
  componentWillReceiveProps:function(newProps) {
    console.log('Component WILL RECEIVE PROPS!')
  },
  shouldComponentUpdate:function(newProps, newState) {
    return true;
  },
  componentWillUpdate:function(nextProps, nextState) {
    console.log('Component WILL UPDATE!');
  },
  componentDidUpdate:function(prevProps, prevState) {
    console.log('Component DID UPDATE!')
  },
  componentWillUnmount:function() {
    console.log('Component WILL UNMOUNT!')
  },
  render: function () {
    return (
      <div>
        <h3>{this.props.myNumber}</h3>
      </div>
    );
  }
});
ReactDOM.render(
  <div>
    <Button />
  </div>,
  document.getElementById('example')
);
```
