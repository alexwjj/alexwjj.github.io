---
title: Vue 转 React不完全指北
sidebar: 'auto'
date: 2021-04-21
tags:
 - React
categories:
 - framework
---

> 🤔🤔🤔

> 老东家 Vue，加实习写了两年半~，期间只是简单学过 React，没怎么写过。新东家用 React + Typescript，用了一个半月，写了写[Demo 在线预览](https://alexwjj.github.io/study/)。
>
>这里简单总结下和vue的区别，如果你也是在Vue转React阶段，欢迎加V交流[扫码加V](https://alexwjj.github.io/)
>
> 有不同见解，欢迎评论区指教🤓

## 一、横向对比

### 1、Vue 官方对比

[Vue 官方对比 React](https://cn.vuejs.org/v2/guide/comparison.html)

### 2、个人的理解

一般 H5 的，或者一些做不大的系统，首选 Vue。因为 Vue 简单，开发效率比较高。同时 Vue 包的体积也更小，在移动端网络差异大的情况下，资源体积是非常重要的。

像一些后台系统，会越做越大的，就用 React。解决方案更多，后期也更方便迭代与维护。（本人有幸开发过 Vue 大项目，webpack 热更新一下 3mins+）

## 二、核心思想

Vue 早期定位是尽可能的`降低前端开发的门槛`（这跟 Vue 作者是独立开发者也有关系）。所以 Vue `推崇`灵活易用（渐进式开发体验），数据可变，双向数据绑定（依赖收集）。

React 早期口号是 `Rethinking Best Practices`(重新思考最佳实践)。背靠大公司 Facebook 的 React，从开始起就不缺关注和用户，而且 React 想要做的是用更好的方式去颠覆前端开发方式（事实上跟早期 jquery 称霸前端，的确是颠覆了）。所以 React `推崇`函数式编程（纯组件），数据不可变以及单向数据流。函数式编程最大的好处是其稳定性（无副作用）和可测试性（输入相同，输出一定相同），所以通常大家说的 React 适合大型应用，根本原因还是在于其函数式编程。

由于两者核心思想的不同，所以导致 Vue 和 React 许多外在表现不同（从开发层面看）。

[引用这位大哥写的 理解 Vue 和 React 区别](https://lq782655835.github.io/blogs/vue/diff-vue-vs-react.html)

## 三、生命周期

### Vue

[Vue 生命周期官方图解](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d8a46ddc11841d3afdf0c87f4844649~tplv-k3u1fbpfcp-watermark.image)
### React

[大神绘图 React 生命周期](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) 点击生命周期即可跳转官网解读

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c7b704f45fd435cb4ec579e8f0038ee~tplv-k3u1fbpfcp-watermark.image)
### 综合对比

生命周期这块基本都是围绕着`挂载、更新、卸载`三个方面

- Vue 提供的比较多，但是常用的: `created/mounted/destroyed`
- React 新版废弃了一些，常用的: `componentDidMount/componentDidUpdate/componentWillUnmount`，Hooks 更是没有

## 四、数据流

### Vue

双向数据流：vue2.x 通过 `v-model` 实现双向绑定，不存在受控组件，v-model 相当于 onChange 的语法糖

```js
<input v-model="value" />
```

### React

单向数据流：`万物皆 Props`，主要通过 `onChange/setState()`的形式该更新数据，所以在 react 存在受控组件的说法

```js
// 会报错，props的值不可修改
<input value={this.props.value}/>

// 在onChange调用setState修改数据,需要调用setState修改绑定数据
<input value={this.state.value} onChange={this.onChange}/>
```

## 五、组件

### 1、组件封装

#### Vue

```js
// 父组件
<template>
  <div class="father">
    父组件
    <Child :name="name"></Child>
  </div>
</template>
<script>
import Child from './Child'
export default {
  name: 'Father',
  components: {
    Child
  },
  data() {
    return {
      text: '接收到了父组件数据'
    }
  }
}
</script>

// 子组件
<template>
  <div class="child">
    <p>{{ name }}</p>
    <p>{{ children }}</p>
  </div>
</template>

<script>
export default {
  name: 'child',
  props: ['name'],
  data() {
    return {
      children: '子组件自己的数据'
    }
  }
}
</script>
```

#### React

```js
import React, { useState, useEffect } from "react";

function Child({ onClick }) {
  const [list, setList] = useState<number[]>([]);
  useEffect(() => {
    setList([1, 2, 3]);
  }, [onClick]);

  return (
    <div>
      {list.map((item, index) => {
        return <div key={index}>{item}</div>;
      })}
    </div>
  );
}

function Father() {
  const show = () => {
    return [4, 5, 6];
  };

  return (
    <div>
      <Child onClick={show}></Child>
    </div>
  );
}

export default Father;

```

### 2、组件通信

#### Vue

- props/emit
- provide/inject
- vuex（双向数据绑定，响应式）
- event bus

#### React

- props(子传父通过`props.function`)
- context
- redux（单向数据流）

### 3、组件嵌套

#### Vue:slot 插槽

```js
// index.vue
<template>
  <Test>
    <div>插槽文本</div>
  </Test>
</template>;
import Test from "./test";

// test.vue
<template>
  <div>
    <slot></slot>
  </div>
</template>;
```

#### React: props.children

```js
// 父组件
import Test from "./test";

<Test>
  <div> 组件嵌套 </div>
</Test>;

// 子组件
import * as React from "react";

const Test: React.FC<any> = (props) => {
  return (
    <>
      <div>测试props.children</div>
      <div>{props.children}</div>
    </>
  );
};

export default Test;
```

## 六、总体感受

### 1、一些区别

- vue `更简单，更方便`，熟悉了 api 以后，实现某些简单功能更快。react 写法更偏向于`原生 JS`，Class 的写法不是很舒服，个人更喜欢 `hooks`。
- 熟悉了 `hooks` 以后，写起来很自由，不用关心 vue 中固定的 `options api`
- react 做中后台优势更大，有大厂加持，生态更好，组件库功能也更多，解决方案也更多
- vue2.x 对 typescript 不太友好，`react + typescript` 更加舒适，两者写起来风格差距较大。
- react JSX 写起来还是不够熟练，`onClick、style、className` 等等，没有 `v-if，v-for，All in JS`。Vue 则推崇 `html、js、css 分离`的写法，当然 vue 也可以写 JSX
- vue 的 prop 必须在`子组件 props 字段里声明`。React 的 prop 不强制声明，直接使用，如果用 TS 的话还是要声明的

### 2、学习

- 很多人说 vue 转 react 很简单，一周熟练上手。我比较菜，感觉适应起来还是`有成本的`，但是也没有很难，最主要的还是要多动手，不懂就深挖为什么
- 为了提高熟练度，用公司的组件库（[zent](https://youzan.github.io/zent/zh/guides/install)）自己动手写了写，有兴趣的老哥参考下：在线预览:[俊劫学习系统](https://alexwjj.github.io/study/)  Github 源码:[基于 react + typescript ](https://github.com/alexwjj/react-ts) 欢迎`start`
- 通读一遍 [react 官网](https://zh-hans.reactjs.org/)，对着例子多敲敲，好好理解，做做笔记。
- [B 站 React技术全家桶](https://www.bilibili.com/video/BV1wy4y1D7JT?from=search&seid=11486613745896637616) 学习视频，可以不敲，`快速过一遍`，毕竟都不是小白了。然后自己搞个项目，`去实现一些自己感兴趣的东西`
- 基础知识过完以后，`查缺补漏`，找各种博文读一读，不理解的`再次`进行学习
- `总结`自己的学习成果，react已经学了一段时间了，后面再整理一下，发出来

### 3、资源推荐
- [React 中文文档](https://zh-hans.reactjs.org/)
- [React 生命周期图解](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
- [React + TypeScript实践 字节前端](https://juejin.cn/post/6952696734078369828)
- [「React进阶」 React全部api解读+基础实践大全(夯实基础2万字总结)](https://juejin.cn/post/6950063294270930980)
- [React Hooks 万字总结 哈罗技术团队](https://juejin.cn/post/6948748617817522206)
- [学习React Hooks系列 - useRef](https://juejin.cn/post/6844903929499615240)
- [React+TS+Redux+Antd从零开发一个企业级后台管理系统 B站视频](https://www.bilibili.com/video/BV1Ba4y1H77E?p=1) 视频
- [B 站 React技术全家桶](https://www.bilibili.com/video/BV1wy4y1D7JT?from=search&seid=11486613745896637616) 视频
## 参考文章

- [「Vue」与「React」--使用上的区别](https://juejin.cn/post/6844903751795359752)
- [从 Vue 转 React 的一些体验](https://www.jianshu.com/p/ac516feb6974)
- [Vue 转 React 指南，看这篇文章就够了](https://markdowner.net/article/166272088981004288)
- [理解 Vue 和 React 区别](https://lq782655835.github.io/blogs/vue/diff-vue-vs-react.html)

## 七、最后

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a09efd5a6cff49f6bf5526f05947307c~tplv-k3u1fbpfcp-watermark.image)
