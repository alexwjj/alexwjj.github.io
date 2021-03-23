---
title: 【React】react 高阶基础
sidebar: 'auto'
date: 2021-02-12
tags:
 - React
categories:
 - framework
---

> 把之前总结的复习一波

## JSX
- JSX 是 JavaScript 的一种语法扩展，它和模板语言很接近，但是它充分具备 JavaScript 的能力
- JSX 会被Babel编译为 React.createElement()， React.createElement(type, config, children) 将返回一个叫作“React Element”的 JS 对象

```js
import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1 className="title">I am the title</h1>
        <p className="content">I am the content</p>
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

## ReactDOM.render

```js
ReactDOM.render(
    // 需要渲染的元素（ReactElement）
    element, 
    // 元素挂载的目标容器（一个真实DOM）
    container,
    // 回调函数，可选参数，可以用来处理渲染结束后的逻辑
    [callback]
)
```
## React生命周期
### React15
![](https://s0.lgstatic.com/i/image/M00/5E/31/Ciqc1F-GZbGAGNcBAAE775qohj8453.png)
- componentReceiveProps 并不是由 props 的变化触发的，而是由父组件的更新触发的
- componentWillUpdate 会在 render 前被触发，它和 componentWillMount 类似，允许你在里面做一些不涉及真实 DOM 操作的准备工作


```js
import React from "react";
import ReactDOM from "react-dom";
// 定义子组件
class LifeCycle extends React.Component {
  constructor(props) {
    console.log("进入constructor");
    super(props);
    // state 可以在 constructor 里初始化
    this.state = { text: "子组件的文本" };
  }
  // 初始化渲染时调用
  componentWillMount() {
    console.log("componentWillMount方法执行");
  }
  // 初始化渲染时调用
  componentDidMount() {
    console.log("componentDidMount方法执行");
  }
  // 父组件修改组件的props时会调用
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps方法执行");
  }
  // 组件更新时调用
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate方法执行");
    return true;
  }
  // 组件更新时调用
  componentWillUpdate(nextProps, nextState) {
    console.log("componentWillUpdate方法执行");
  }
  // 组件更新后调用
  componentDidUpdate(nextProps, nextState) {
    console.log("componentDidUpdate方法执行");
  }
  // 组件卸载时调用
  componentWillUnmount() {
    console.log("子组件的componentWillUnmount方法执行");
  }
  // 点击按钮，修改子组件文本内容的方法
  changeText = () => {
    this.setState({
      text: "修改后的子组件文本"
    });
  };

  render() {
    console.log("render方法执行");
    return (
      <div className="container">
        <button onClick={this.changeText} className="changeText">
          修改子组件文本内容
        </button>
        <p className="textContent">{this.state.text}</p>
        <p className="fatherContent">{this.props.text}</p>
      </div>
    );
  }
}
// 定义 LifeCycle 组件的父组件
class LifeCycleContainer extends React.Component {
  // state 也可以像这样用属性声明的形式初始化
  state = {
    text: "父组件的文本",
    hideChild: false
  };
  // 点击按钮，修改父组件文本的方法
  changeText = () => {
    this.setState({
      text: "修改后的父组件文本"
    });
  };
  // 点击按钮，隐藏（卸载）LifeCycle 组件的方法
  hideChild = () => {
    this.setState({
      hideChild: true
    });
  };
  render() {
    return (
      <div className="fatherContainer">
        <button onClick={this.changeText} className="changeText">
          修改父组件文本内容
        </button>
        <button onClick={this.hideChild} className="hideChild">
          隐藏子组件
        </button>
        {this.state.hideChild ? null : <LifeCycle text={this.state.text} />}
      </div>
    );
  }
}
ReactDOM.render(<LifeCycleContainer />, document.getElementById("root"));
```

### React 16.4
![](https://s0.lgstatic.com/i/image/M00/5D/CF/Ciqc1F-FVcSALRwNAAIomWwVcQU231.png)
- 只用 getDerivedStateFromProps 来完成 props 到 state 的映射
- static 方法内部拿不到组件实例的 this，这就导致你无法在 getDerivedStateFromProps 里面做任何类似于 this.fetch()、不合理的 this.setState（会导致死循环的那种）这类可能会产生副作用的操作。
- getSnapshotBeforeUpdate 的返回值会作为第三个参数给到 componentDidUpdate。它的执行时机是在 render 方法之后，真实 DOM 更新之前。在这个阶段里，我们可以同时获取到更新前的真实 DOM 和更新前后的 state&props 信息

React 16 的生命周期被划分为了 render 和 commit 两个阶段，而 commit 阶段又被细分为了 pre-commit 和 commit。

- render 阶段：纯净且没有副作用，可能会被 React 暂停、终止或重新启动。
- pre-commit 阶段：可以读取 DOM。
- commit 阶段：可以使用 DOM，运行副作用，安排更新

React 16 打算废弃的是哪些生命周期：
- componentWillMount；
- componentWillUpdate；
- componentWillReceiveProps。

这些生命周期的共性，就是它们都处于 render 阶段，都可能重复被执行，而且由于这些 API 常年被滥用，它们在重复执行的过程中都存在着不可小觑的风险。
## Fiber
### Fiber 会使原本同步的渲染过程变成异步的。

同步渲染的递归调用栈是非常深的,这个漫长且不可打断的更新过程，将会带来用户体验层面的巨大风险：同步渲染一旦开始，便会牢牢抓住主线程不放，直到递归彻底完成。在这个过程中，浏览器没有办法处理任何渲染之外的事情，会进入一种无法处理用户交互的状态

Fiber 会将一个大的更新任务拆解为许多个小任务。每当执行完一个小任务时，渲染线程都会把主线程交回去，看看有没有优先级更高的工作要处理，确保不会出现其他任务被“饿死”的情况，进而避免同步渲染带来的卡顿。在这个过程中，渲染线程不再“一去不回头”，而是可以被打断的，这就是所谓的“异步渲染”

实现增量渲染的目的，是为了实现任务的可中断、可恢复，并给不同的任务赋予不同的优先级，最终达成更加顺滑的用户体验。
### Reconciler
![](https://s0.lgstatic.com/i/image/M00/6E/D8/CgqCHl-zlfaALmyYAABbITniefc225.png)
Stack Reconciler 是一个同步的递归过程,树的深度优先遍历的过程
## 单向数据流
- 基于 props 的单向数据流
- 父传子 props 子穿父 通过绑定父组件上下文的函数
- React.createContext 
```js
class Child extends React.Component {
  // 初始化子组件的 state
  state = {
    text: '子组件的文本'
  }
  // 子组件的按钮监听函数
  changeText = () => {
    // changeText 中，调用了父组件传入的 changeFatherText 方法
    this.props.changeFatherText(this.state.text)
  }
  render() {
    return (
      <div className="child">
        {/* 注意这里把修改父组件文本的动作放在了 Child 里 */}
        <button onClick={this.changeText}>
          点击更新父组件的文本
        </button>
      </div>
    );
  }
}
```

## Redux
![](https://s0.lgstatic.com/i/image/M00/81/9F/CgqCHl_Rii2AVvUbAADn4s_6rB8369.png)
- redux-thunk——经典的异步 Action 解决方案
```js
// 引入 redux
import { createStore } from 'redux'
// 创建 store
const store = createStore(
    reducer,
    initial_state,
    applyMiddleware(middleware1, middleware2, ...)
);
```

## React hooks
###

### useEffect()：允许函数组件执行副作用操作
useEffect 可以接收两个参数，分别是回调函数与依赖数组`useEffect(callBack, [])`

useEffect 能够为函数组件引入副作用。过去我们习惯放在 componentDidMount、componentDidUpdate 和 componentWillUnmount 三个生命周期里来做的事，现在可以放在 useEffect 里来做，比如操作 DOM、订阅事件、调用外部 API 获取数据等。

## setState
![](https://s0.lgstatic.com/i/image2/M01/04/81/Cip5yF_yswuAWzDfAAEc1lISh-Q211.png)

React 运行时中，setState 异步的实现方式有点类似于 Vue 的 $nextTick 和浏览器里的 Event-Loop：每来一个 setState，就把它塞进一个队列里“攒起来”。等时机成熟，再把“攒起来”的 state 结果做合并，最后只针对最新的 state 值走一次更新流程。这个过程，叫作“批量更新”
```js
this.setState({
  count: this.state.count + 1    ===>    入队，[count+1的任务]
});
this.setState({
  count: this.state.count + 1    ===>    入队，[count+1的任务，count+1的任务]
});
this.setState({
  count: this.state.count + 1    ===>    入队, [count+1的任务，count+1的任务, count+1的任务]
});
                                          ↓
                                         合并 state，[count+1的任务]
                                          ↓
                                         执行 count+1的任务
```
setTimeout 帮助 setState “逃脱”了 React 对它的管控。只要是在 React 管控下的 setState，一定是异步的。 setState 并不是真正的异步函数，它实际上是通过队列延迟执行操作实现的，通过 isBatchingUpdates 来判断 setState 是先存进 state 队列还是直接更新。值为 true 则执行异步操作，false 则直接同步更新
```js
reduce = () => {
  setTimeout(() => {
    console.log('reduce setState前的count', this.state.count) // 2
    this.setState({
      count: this.state.count - 1
    });
    console.log('reduce setState后的count', this.state.count) // 1
  },0);
}
```
