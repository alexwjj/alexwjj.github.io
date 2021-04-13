---
title: 【TypeScript】- 基础部分
sidebar: "auto"
date: 2021-03-02
tags:
  - 基础
categories:
  - 前端
---

> 边学边写，冲冲冲

<!-- more -->
## 记忆点（简单记忆）
- <T>代表 类型参数 eg identity<T> 等于 identity<string>

- 
## 基础类型

null,undefinde,symbol,boolean，void 这些都是最常用的基础数据类型

```js
const count: number = 918;
```

## 对象类型

interface 和 type 的区别：type 更强大，interface 可以进行声明合并，type 不行；

```js
interface Hero {
  name: string;
  age: number;
  skill: string;
  skinNum?: number;
  say(): string; // say函数返回值为string
  [propname: string]: any; // 当前Hero可定义任意字符串类型的key
}
// 继承
interface littleSoldier extends Hero {
  rush(): string;
}

type Hero = {
  name: string,
  age: number,
  skill: string,
  skinNum?: number,
};
```

## 数组类型

```js
const numberArr: number[] = [1, 2, 3];

const arr: (number | string)[] = [1, "string", 2];
```

## 元组

元组和数组类似，但是类型注解时会不一样

```js
// 数组 某个位置的值可以是注解中的任何一个
const LOL: (string | number)[] = ["zed", 25, "darts"];

// 元祖 每一项数据类型必须一致
const LOL: [string, string, number] = ["zed", "darts", 25];
```

## 联合类型

简单说就是：某个变量可能是多个 interface 中的其中一个，用 | 分割

```js
interface Waiter {
  anjiao: boolean;
  say: () => {};
}

interface Teacher {
  anjiao: boolean;
  skill: () => {};
}

function judgeWho(animal: Waiter | Teacher) {}
```

## 泛型

简单说就是：泛指的类型，不确定的类型

```js
// T 自定义名称
function myFun<T>(params: T[]) {
  return params;
}
myFun < string > ["123", "456"];

// 定义多个泛型
function join<T, P>(first: T, second: P) {
  return `${first}${second}`;
}
join < number, string > (1, "2");
```

## 类型保护

### 断言

```js
function judgeWho(animal: Waiter | Teacher) {
  if (animal.anjiao) {
    (animal as Teacher).skill();
  }else{
    (animal as Waiter).say();
  }
}
```

### in

```js
function judgeWhoTwo(animal: Waiter | Teacher) {
  if ("skill" in animal) {
    animal.skill();
  } else {
    animal.say();
  }
}
```

### typeof

```js
function add(first: string | number, second: string | number) {
  if (typeof first === "string" || typeof second === "string") {
    return `${first}${second}`;
  }
  return first + second;
}
```

### instanceof

```js
class NumberObj {
  count: number;
}
function addObj(first: object | NumberObj, second: object | NumberObj) {
  if (first instanceof NumberObj && second instanceof NumberObj) {
    return first.count + second.count;
  }
  return 0;
}
```

## 类型注解

意思是显示的告诉代码，我们的 count 变量就是一个数字类型，这就叫做类型注解

```js
let count: number; // 类型注解
count = 123;
```

## 类型推断

- 如果 TS 能够自动分析变量类型， 我们就什么也不需要做了
- 如果 TS 无法分析变量类型的话， 我们就需要使用类型注解

```js
let countInference = 123;
```

## 函数参数 && 返回参数

### void && never

没有返回值的函数: void

```js
function sayHello(): void {
  console.log("hello world");
}
```

如果一个函数是永远也执行不完的，就可以定义返回值为 never

```js
function errorFuntion(): never {
  throw new Error();
  console.log("Hello World");
}
```

## typeof

typeof 操作符可以用来获取一个变量或对象的类型

```js
interface Game {
  name: string;
  skill: string;
}

const Lol: Person = { name: "影流之主", skill: "影子" };
type LOL = typeof Lol; // type LOL = Game
```

在上面代码中，我们通过 typeof 操作符获取 Lol 变量的类型并赋值给 LOL 类型变量，之后我们就可以使用 LOL 类型

```js
const zed: LOL = { name: "劫", skill: "双镖" };
```

## keyof

keyof 与 Object.keys 略有相似，只不过 keyof 取 interface 的键

```js
interface Point {
    x: number;
    y: number;
}

// type keys = "x" | "y"
type keys = keyof Point;

```

用 keyof 可以更好的定义数据类型

```js
function get<T extends object, K extends keyof T>(o: T, name: K): T[K] {
  return o[name]
}
```

## 类里的关键字

- public
- private 类的外部不可用，继承也不行
- protected 类的外部不可用，继承可以
- public readOnly xxx 只读属性
- static funcXXX 静态方法，不需要 new 就可以调用
- abstract funcXXX 抽象类，所有子类都必须要实现 funcXXX

## tsconfig.json

- tsc -init 生成 tsconfig.json，项目目录下直接 tsc,编译的时候就会走配置文件

## enum 定义枚举值

```js
enum ReqMethodEnum {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}
```

