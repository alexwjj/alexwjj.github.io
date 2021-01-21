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


## Object.defineProperty() 不能监听数组长度变化以及对象新属性的变化

通过下标修改数组长度，数组的length属性被初始化configurable	false，所以想要通过get/set方法来监听length属性是不可行的。

vue中通过重写了七个能改变原数组的方法来进行数据监听

对象还是使用Object.defineProperty()添加get和set来监听

参考
- [vue通过数组索引修改数据，视图会变化吗？](https://mp.weixin.qq.com/s/PepQf9LtxIER9xE9MVEAxw)

- [为什么defineProperty不能检测到数组长度的变化](https://youngzhang08.github.io/2018/07/30/%E4%B8%BA%E4%BB%80%E4%B9%88defineProperty%E4%B8%8D%E8%83%BD%E6%A3%80%E6%B5%8B%E5%88%B0%E6%95%B0%E7%BB%84%E9%95%BF%E5%BA%A6%E7%9A%84%E5%8F%98%E5%8C%96/)

## vue初始化init
Vue 初始化主要就干了几件事情，合并配置，初始化生命周期，初始化事件中心，初始化渲染，初始化 data、props、computed、watcher 等等。

## Vue.nextTick()原理？模拟实现？
## vue diff 算法
针对新旧Vnode，只对比父节点相同的新旧子节点（比较的是Vnode），时间复杂度只有O(n)

**新旧节点对比过程**

1、先找到 不需要移动的相同节点，消耗最小

2、再找相同但是需要移动的节点，消耗第二小

3、最后找不到，才会去新建删除节点，保底处理

注意：新旧节点对比过程，不会对这两棵Vnode树进行修改，而是以`比较的结果直接对 真实DOM 进行修改`

Vue的patch是即时的，并不是打包所有修改最后一起操作DOM（React则是将更新放入队列后集中处理），朋友们会问这样做性能很差吧？实际上现代浏览器对这样的DOM操作做了优化，并无差别

参考文章：[Vue 虚拟dom diff原理详解](https://segmentfault.com/a/1190000020663531)
## vue编译阶段
- 模板 -> AST （最消耗性能）
- AST -> VNode
- VNode -> DOM


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
```js
    // 重写7个可以修改原数组的数组方法
    let ARRAY_METHOD = [
      'push',
      'pop',
      'shift',
      'unshift',
      'reverse',
      'sort',
      'splice',
    ];
    // 继承数组原型的一些方法
    let array_methods = Object.create( Array.prototype );
    // 重写
    ARRAY_METHOD.forEach( method => {
      array_methods[ method ] = function () {
        // 调用原来的方法
        console.log( '调用的是拦截的 ' + method + ' 方法' );
        // 将数据进行响应式化
        for( let i = 0; i < arguments.length; i++ ) {
          reactify( arguments[ i ] );
        } 
        let res = Array.prototype[ method ].apply( this, arguments );
        // Array.prototype[ method ].call( this, ...arguments ); // 类比
        return res;
      }
    } );
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
















