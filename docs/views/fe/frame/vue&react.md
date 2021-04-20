---
title: 【Vue & React】vue 和 react对比
sidebar: 'auto'
date: 2021-04-12
tags:
 - React
categories:
 - framework
---

> 老东家vue，写了两年半~ 期间只是简单学过react，没怎么写过。新东家用react，现在必须要写了，总结一波

## 前言
[vue 官方对比react](https://cn.vuejs.org/v2/guide/comparison.html)

对于项目，一般H5的，或者一些做不大的系统，首选Vue，因为Vue简单，开发也比较快，Vue包的体积也更小。
像一些后台系统，会越做越大的，就用React，解决方案更多，后期迭代维护也更方便。
## 核心思想

Vue早期定位是尽可能的降低前端开发的门槛（这跟Vue作者是独立开发者也有关系）。所以Vue推崇灵活易用（渐进式开发体验），数据可变，双向数据绑定（依赖收集）。

React早期口号是Rethinking Best Practices(重新思考最佳实践)。背靠大公司Facebook的React，从开始起就不缺关注和用户，而且React想要做的是用更好的方式去颠覆前端开发方式（事实上跟早期jquery称霸前端，的确是颠覆了）。所以React推崇函数式编程（纯组件），数据不可变以及单向数据流。函数式编程最大的好处是其稳定性（无副作用）和可测试性（输入相同，输出一定相同），所以通常大家说的React适合大型应用，根本原因还是在于其函数式编程。

由于两者核心思想的不同，所以导致Vue和React许多外在表现不同（从开发层面看）。

[引用这位大哥写的 理解Vue和React区别](https://lq782655835.github.io/blogs/vue/diff-vue-vs-react.html)
## 生命周期
### vue
[vue生命周期官方图解](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)
### react
[大神绘图 react生命周期](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

### 综合对比
## 数据流
### vue
双向数据流：vue2.x 通过v-model实现双向绑定，不存在受控组件，v-model相当于就是onChange的语法糖
```js
<input v-model="value"/>
```
### react
单向数据流：万物皆Props，主要通过onChange/setState()的形式该更新数据，所以在react存在受控组件的说法
```js
<input value={this.props.value}/>  // 会报错

<input value={this.state.value} onChange={this.onChange}/>  // 在onChange调用setState修改数据
```
## 组件

### 组件封装


### 组件通信
#### vue 
- props/emit
- provide/inject
- vuex
- event bus
#### react
- props/callback
- context
- redux
### 组件嵌套

#### vue
- 具名插槽
- 匿名插槽

#### react
- props.children



