---
title: 【vue】- vue2.x 原理解析
sidebar: 'auto'
date: 2021-01-20
tags:
 - vue
categories:
 - 前端
---

> 学习框架的思想，看齐and思考自己什么时候可以接近大佬
<!-- more -->

## vue中值得学习的点
1. 科里化: 一个函数原本有多个参数, 只传入`一个`参数, 生成一个新函数, 由新函数接收剩下的参数来运行得到结构.
2. 偏函数: 一个函数原本有多个参数, 只传入`一部分`参数, 生成一个新函数, 由新函数接收剩下的参数来运行得到结构.
3. 高阶函数: 一个函数`参数是一个函数`, 该函数对参数这个函数进行加工, 得到一个函数, 这个加工用的函数就是高阶函数.

## vue 响应式系统
简述：
vue 初始化时会用Object.defineProperty()给data中每一个属性添加get和set，同时创建dep和watcher进行依赖收集与派发更新，最后通过diff算法对比新老vnode差异，通过patch即时更新DOM

简易版本：
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6d4d627b9d34347b39830acc9df07c1~tplv-k3u1fbpfcp-watermark.image)

详细版本，可以参考下[图片引用地址: 图解 Vue 响应式原理](https://juejin.cn/post/6857669921166491662)
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7c41d69e2a646d1a97327c5922e2b8a~tplv-k3u1fbpfcp-watermark.image)


## vue使用Object.defineProperty() 的缺陷

通过下标修改数组长度，数组的length属性被初始化configurable	false，所以想要通过get/set方法来监听length属性是不可行的。

vue中通过重写了七个能改变原数组的方法来进行数据监听

对象还是使用Object.defineProperty()添加get和set来监听

参考
- [vue通过数组索引修改数据，视图会变化吗？](https://mp.weixin.qq.com/s/PepQf9LtxIER9xE9MVEAxw)

- [为什么defineProperty不能检测到数组长度的变化](https://youngzhang08.github.io/2018/07/30/%E4%B8%BA%E4%BB%80%E4%B9%88defineProperty%E4%B8%8D%E8%83%BD%E6%A3%80%E6%B5%8B%E5%88%B0%E6%95%B0%E7%BB%84%E9%95%BF%E5%BA%A6%E7%9A%84%E5%8F%98%E5%8C%96/)


## Vue.nextTick()原理
在下次DOM更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的DOM。

源码实现：`Promise > MutationObserver > setImmediate > setTimeout`

参考文章：[浅析Vue.nextTick()原理](https://segmentfault.com/a/1190000020499713)

## computed 的实现原理
computed 本质是一个惰性求值的观察者。

computed 内部实现了一个惰性的 watcher,也就是 computed watcher,computed watcher 不会立刻求值,同时持有一个 dep 实例。

其内部通过 this.dirty 属性标记计算属性是否需要重新求值。

当 computed 的依赖状态发生改变时,就会通知这个惰性的 watcher,

computed watcher 通过 this.dep.subs.length 判断有没有订阅者,

有的话,会重新计算,然后对比新旧值,如果变化了,会重新渲染。 (Vue 想确保不仅仅是计算属性依赖的值发生变化，而是当计算属性最终计算的值发生变化时才会触发渲染 watcher 重新渲染，本质上是一种优化。)

没有的话,仅仅把 this.dirty = true。 (当计算属性依赖于其他数据时，属性并不会立即重新计算，只有之后其他地方需要读取属性的时候，它才会真正计算，即具备 lazy（懒计算）特性。)

## computed 和 watch

Computed本质是一个具备缓存的watcher，依赖的属性发生变化就会更新视图。
适用于计算比较消耗性能的计算场景。当表达式过于复杂时，在模板中放入过多逻辑会让模板难以维护，可以将复杂的逻辑放入计算属性中处理。

Watch没有缓存性，更多的是观察的作用，可以监听某些数据执行回调。当我们需要深度监听对象中的属性时，可以打开deep：true选项，这样便会对对象中的每一项进行监听。这样会带来性能问题，优化的话可以使用字符串形式监听，如果没有写到组件中，不要忘记使用unWatch手动注销哦。

注意：Watcher : 观察者对象 , 实例分为`渲染 watcher` (render watcher),`计算属性 watcher` (computed watcher),`侦听器 watcher`（user watcher）三种

## vue diff 算法
针对新旧Vnode，只对比父节点相同的新旧子节点（比较的是Vnode），时间复杂度只有O(n)

**新旧节点对比过程**

1、先找到 不需要移动的相同节点，消耗最小

2、再找相同但是需要移动的节点，消耗第二小

3、最后找不到，才会去新建删除节点，保底处理

注意：新旧节点对比过程，不会对这两棵Vnode树进行修改，而是以`比较的结果直接对 真实DOM 进行修改`

Vue的patch是即时的，并不是打包所有修改最后一起操作DOM（React则是将更新放入队列后集中处理），朋友们会问这样做性能很差吧？实际上现代浏览器对这样的DOM操作做了优化，并无差别

Vue2的核心Diff算法采用了双端比较的算法，同时从新旧children的两端开始进行比较，借助key值找到可复用的节点，再进行相关操作。相比React的Diff算法，同样情况下可以减少移动节点次数，减少不必要的性能损耗，更加的优雅。

参考文章：[Vue 虚拟dom diff原理详解](https://segmentfault.com/a/1190000020663531)
## vue 渲染过程
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93839e5df0f0408d994e6b7b2dd2f474~tplv-k3u1fbpfcp-watermark.image)

1. 调用 compile 函数,生成 render 函数字符串 ,编译过程如下:
 - parse 使用大量的正则表达式对template字符串进行解析，将标签、指令、属性等转化为抽象语法树AST。模板 -> AST （最消耗性能）
 - optimize 遍历AST，找到其中的一些静态节点并进行标记，方便在页面重渲染的时候进行diff比较时，直接跳过这一些静态节点，优化runtime的性能。AST -> VNode
 - generate 将最终的AST转化为render函数字符串。VNode -> DOM
2. 调用 new Watcher 函数,监听数据的变化,当数据发生变化时，Render 函数执行生成 vnode 对象
3. 调用 patch 方法,对比新旧 vnode 对象,通过 DOM diff 算法,添加、修改、删除真正的 DOM 元素

## Vue 中的 key 到底有什么用？
key 是给每一个 vnode 的唯一 id,依靠 key,我们的 diff 操作可以更准确、更快速 (对于简单列表页渲染来说 diff 节点也更快,但会产生一些隐藏的副作用,比如可能不会产生过渡效果,或者在某些节点有绑定数据（表单）状态，会出现状态错位。)

diff 算法的过程中,先会进行新旧节点的首尾交叉对比,当无法匹配的时候会用新节点的 key 与旧节点进行比对,从而找到相应旧节点.

更准确 : 因为带 key 就不是就地复用了,在 sameNode 函数 a.key === b.key 对比中可以避免就地复用的情况。所以会更加准确,如果不加 key,会导致之前节点的状态被保留下来,会产生一系列的 bug。

更快速 : key 的唯一性可以被 Map 数据结构充分利用,相比于遍历查找的时间复杂度 O(n),Map 的时间复杂度仅仅为 O(1),源码如下:

```js
function createKeyToOldIdx(children, beginIdx, endIdx) {
  let i, key;
  const map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) map[key] = i;
  }
  return map;
}

```
## 解析 a.b.c.d
函数柯里化 + 闭包 + 递归
```js
    function createGetValueByPath( path ) {
      let paths = path.split( '.' ); // [ xxx, yyy, zzz ]
      
      return function getValueByPath( obj ) {
        let res = obj;
        let prop;
        while( prop = paths.shift() ) {
          res = res[ prop ];
        }
        return res;
      }
    }
    let getValueByPath = createGetValueByPath( 'a.b.c.d' );

    var o = {
      a: {
        b: {
          c: {
            d: {
              e: '正确了'
            }
          }
        }
      }
    };

    var res = getValueByPath( o );


    console.log( res );
```

## 针对7个数组方法的重写
Vue 通过原型拦截的方式重写了数组的 7 个方法,首先获取到这个数组的ob,也就是它的 Observer 对象,如果有新的值,就调用 observeArray 对新的值进行监听,然后手动调用 notify,通知 render watcher,执行 update
```js
const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);
const methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse"
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function(method) {
  // cache original method
  const original = arrayProto[method];
  def(arrayMethods, method, function mutator(...args) {
    const result = original.apply(this, args);
    const ob = this.__ob__;
    let inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
    }
    if (inserted) ob.observeArray(inserted);
    // notify change
    ob.dep.notify();
    return result;
  });
});

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};
```

### vue响应式 defineReactive 实现
```js
    // 简化后的版本 
    function defineReactive( target, key, value, enumerable ) {
      // 折中处理后, this 就是 Vue 实例
      let that = this;

      // 函数内部就是一个局部作用域, 这个 value 就只在函数内使用的变量 ( 闭包 )
      if ( typeof value === 'object' && value != null && !Array.isArray( value ) ) {
        // 是非数组的引用类型
        reactify( value ); // 递归
      }

      Object.defineProperty( target, key, {
        configurable: true,
        enumerable: !!enumerable,

        get () {
          console.log( `读取 ${key} 属性` ); // 额外
          return value;
        },
        set ( newVal ) {
          console.log( `设置 ${key} 属性为: ${newVal}` ); // 额外

          value = reactify( newVal );

        }
      } );
    }
```
### vue响应式 reactify 实现
```js
// 将对象 o 响应式化
    function reactify( o, vm ) {
      let keys = Object.keys( o );

      for ( let i = 0; i < keys.length; i++ ) {
        let key = keys[ i ]; // 属性名
        let value = o[ key ];
        if ( Array.isArray( value ) ) {
          // 数组
          value.__proto__ = array_methods; // 数组就响应式了
          for ( let j = 0; j < value.length; j++ ) {
            reactify( value[ j ], vm ); // 递归
          }
        } else {
          // 对象或值类型
          defineReactive.call( vm, o, key, value, true );
        }

        // 只需要在这里添加代理即可 ( 问题: 在这里写的代码是会递归 )
        // 如果在这里将 属性映射到 Vue 实例上, 那么就表示 Vue 实例可以使用属性 key
        // { 
        //   data:  { name: 'jack', child: { name: 'jim' } }
        // }
      }
    }
```
### vue中组件访问属性代理this.data.xxx 转换 this.xxx
```js
    /** 将 某一个对象的属性 访问 映射到 对象的某一个属性成员上 */
    function proxy( target, prop, key ) {
      Object.defineProperty( target, key, {
        enumerable: true,
        configurable: true,
        get () {
          return target[ prop ][ key ];
        },
        set ( newVal ) {
          target[ prop ][ key ] = newVal;
        }
      } );
    }
```
















