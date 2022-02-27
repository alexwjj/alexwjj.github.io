// const myInstance = (target, origin) => {
//   // getPrototypeOf 查找原型
//   let proto = Object.getPrototypeOf(target);
//   const prototype = origin.prototype;
//   while (true) {
//     if(!proto) return false;
//     if(proto === prototype) return true;
//     proto = Object.getPrototypeOf(proto)
//   }
// }
// function myPuppy() {}
// const people1 = new Object();
// const people2 = new myPuppy();
// console.log(myInstance(people1, Object));
// console.log(myInstance(people1, myPuppy));

// function myNew () {
//   let obj = Object.create(null);
//   const constructor = Array.prototype.shift.call(arguments);
//   obj.__proto__ = constructor.prototype;
//   let result = constructor.apply(obj, arguments);
//   // 如果构造函数有返回值，只返回构造函数返回的对象。
//   return typeof result === 'object' ? result : obj;
// }

// // 使用定时器写法，delay毫秒后第一次执行，第二次事件停止触发后依然会再一次执行
// // 可以结合时间戳 实现更准确的节流
// function debounce(fn, delay = 500) {
//   let timer = null;
//   return function () {
//     if(timer) return;
//     timer = setTimeout(() => {
//       timer = null;
//       fn.apply(this, arguments)
//     }, delay)
//   }
// }

// function myCall(context = window, ...args) {
//   context.fn = this;
//   const result = evel('context.fn(...args)');
//   delete context.fn;
//   return result;
// }

// // apply和call原理一直，第二个参数不同

// // bind 函数实现
// function myBind(context) {
//   // 判断调用对象是否为函数
//   if (typeof this !== "function") {
//     throw new TypeError("Error");
//   }
//   // 获取参数
//   var args = [...arguments].slice(1),
//       fn = this;
//   return function Fn() {
//     // 根据调用方式，传入不同绑定值
//     return fn.apply(
//       this instanceof Fn ? this : context,
//       args.concat(...arguments)
//     );
//   };
// };

// function deepCopy(obj) {
//   if (!obj || typeof obj !== "object") return;
//   let newObject = Array.isArray(obj) ? [] : {};
//   for (let key in obj) {
//     // in判断的是对象的所有属性，包括对象实例及其原型的属性；
//     // hasOwnProperty则是判断对象实例的是否具有某个属性
//     if (obj.hasOwnProperty(key)) {
//       newObject[key] =
//         typeof obj[key] === "object" ? deepCopy(obj[key]) : obj[key];
//     }
//   }
//   return newObject;
// }

// class EventEmitter {
//   constructor() {
//     this.events = {};
//   }
//   // 订阅
//   on(eventName, callback) {
//     const callbacks = this.event[eventName] || [];
//     callbacks.push(callback);
//     this.events[eventName] = callbacks;
//   }
//   // 发布
//   emit(eventName, ...args) {
//     const callbacks = this.event[eventName] || [];
//     callbacks.forEach((cb) => cb(...args));
//   }
//   // 取消订阅
//   off(eventName, callback) {
//     const callbacks = this.events[eventName] || [];
//     const newCallbacks = callbacks.filter((cb) => cb !== callback);
//     this.events[eventName] = newCallbacks;
//   }
//   // 只监听一次
//   once(eventName, callback) {
//     const one = (...args) => {
//       callback(...args);
//       this.off(eventName, one);
//     };
//     this.on(eventName, one);
//   }
// }

// class Notifier {
//   constructor() {
//     this.observers = [];
//   }

//   add(observer) {
//     this.observers.push(observer)
//   }

//   remove(observer) {
//     this.observers = this.observers.filter(ober => ober !== observer)
//   }

//   notify() {
//     this.observers.forEach((observer) => {
//       observer.update()
//     })
//   }
// }

// class Observer {
//   constructor (name) {
//     this.name = name;
//   }
//    update () {
//      console.log(this.name, 'name');
//    }
// }

// const ob1 = new Observer('J1')
// const ob2 = new Observer('J2')
// const notifier = new Notifier()
// notifier.add(ob1)
// notifier.add(ob2)

// notifier.notify()
// const fs = require("fs");
// const path = require("path");

// const readDir = (entry) => {
//     // 获取文件夹内部所有文件以及文件夹
//     const dirInfo = fs.readdirSync(entry);
//     console.log(dirInfo);
//     dirInfo.forEach(item => {
//         // 完整路径
//         const location = path.join(entry, item)
//         // 每个文件的具体熟悉，是文件还是文件夹
//         const info = fs.statSync(location);
//         if (info.isDirectory()) {
//             // 递归
//             readDir(location)
//         } else {
//             console.log(location);
//         }
//     })
// }

// readDir(__dirname)

// let arr = [1,2,3,[[4,5],6],7,8,9]
// console.log(arr.flat(2));

// 转换前：
// source = [{
//   id: 1,
//   pid: 0,
//   name: 'body'
// }, {
//   id: 2,
//   pid: 1,
//   name: 'title'
// }, {
//   id: 3,
//   pid: 2,
//   name: 'div'
// }]

// function toTree (data) {
//   let result = [];
//   let map = {};
//   data.forEach((item) => {
//     map[item.id] = item
//   })
//   data.forEach((item) => {
//     let parent = map[item.pid];
//     if(parent) {
//       (parent.children || (parent.children = [])).push(item)
//     } else {
//       result.push(item)
//     }
//   })
//   return result;
// }
// console.log(toTree(source));

// function fn (n){
//   if(n==1 || n==2) return 1;
//   return fn(n-2)+fn(n-1)
// }
// console.log(fn(7));

// function lengthOfLongestSubstring(s) {
//   let map = new Map();
//   let i = -1;
//   let res = 0;
//   for(let j = 0; j < s.length; j++) {
//     if(map.has(s[j])) {
//       i = Math.max(i, map.get(s[j]))
//     }
//     res = Math.max(res, j - i);
//     map.set(s[j], j)
//   }
//   return res;
// }

// console.log(lengthOfLongestSubstring('aabbbcccccdddesdf'));

// function mySetInterval(fn, timeout) {
//   let timerId = null;
//   // 设置递归函数，模拟定时器执行。
//   function interval() {
//     fn();
//     timerId = setTimeout(interval, timeout);
//   }
//   timerId = setTimeout(interval, timeout);
//   return timerId;
// }
// const STATUS = {
//   PENDING: 'pending',
//   FULFILlED: 'fulfilled',
//   REJECTED: 'rejected',
// }

// class MyPromise {
//   constructor(executor) {
//     this.state = STATUS.PENDING;
//     this.value = undefined;
//     this.reason = undefined;

//     this.onResolvedCallbacks = [];
//     this.onRejectedCallbacks = [];

//     let resolve = value => {
//       if(this.state === STATUS.PENDING) {
//         this.state = STATUS.FULFILlED;
//         this.value = value;
//         this.onResolvedCallbacks.forEach(fn=>fn());
//       }
//     }

//     let reject = reason => {
//       if(this.state === STATUS.REJECTED) {
//         this.state = STATUS.REJECTED;
//         this.reason = reason;
//         this.onRejectedCallbacks.forEach(fn=>fn());
//       }
//     }

//     try{
//       executor(resolve, reject);
//     } catch (err) {
//       reject(err);
//     }
//   }
//   then(onFulfilled,onRejected) {
//     // 声明返回的promise2
//     let promise2 = new Promise((resolve, reject)=>{
//       if (this.state === STATUS.FULFILlED) {
//         let x = onFulfilled(this.value);
//         resolvePromise(promise2, x, resolve, reject);
//       };
//       if (this.state === STATUS.REJECTED) {
//         let x = onRejected(this.reason);
//         resolvePromise(promise2, x, resolve, reject);
//       };
//       if (this.state === STATUS.PENDING) {
//         this.onResolvedCallbacks.push(()=>{
//           let x = onFulfilled(this.value);
//           resolvePromise(promise2, x, resolve, reject);
//         })
//         this.onRejectedCallbacks.push(()=>{
//           let x = onRejected(this.value);
//           resolvePromise(promise2, x, resolve, reject);
//         })
//       }
//     });
//     // 返回promise，完成链式
//     return promise2;
//   }

// }
// let p1 = new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     console.log(1);
//       resolve(1)
//   }, 1000)
// })
// let p2 = new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     console.log(2);

//       resolve(2)
//   }, 2000)
// })
// let p3 = new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     console.log(3);

//       resolve(3)
//   }, 3000)
// })

// const myPromiseRace = (promises) => {
//   return new Promise((resolve, reject) => {
//     for (let i = 0; i < promises.length; i++) {
//       promises[i].then(resolve, reject)
//     }
//   })
// }

// myPromiseRace([p1, p2, p3])
// const intervalMap = new Map();

// let mySetInterval = (callback, time) => {
//   let timeIdFirst = null;
//   let interval = () => {
//     let timeId = setTimeout(() => {
//       callback && callback();
//       interval();
//     }, time);
//     if (!timeIdFirst) {
//       timeIdFirst = timeId;
//     }
//     intervalMap.set(timeIdFirst, timeId);
//   };
//   interval();
//   return timeIdFirst;
// };

// const myClearInterval = (timeId) => {
//   clearTimeout(intervalMap.get(timeId));
//   intervalMap.delete(timeId);
// };

// let time1 = mySetInterval(() => {
//   console.log(123);
// }, 1000);

// let time2 = mySetInterval(() => {
//   console.log(456);
// }, 2000);

// setTimeout(() => {
//   myClearInterval(time1);
//   myClearInterval(time2);
// }, 5000);

// class myPromise {
//   constructor(executor) {
//     this.state = "pending";
//     this.value = null;
//     this.reason = null;

//     this.resolveCallback = [];
//     this.rejectedCallback = [];


//     const resolve = (value) => {
//       setTimeout(() => {
//         if(this.state === "pending") {
//           this.value = value;
//           this.state = 'fulfilled';
//           this.resolveCallback.forEach (cb => cb(value))
//         }
//       }, 0)
//     };

//     const reject = (reason) => {
//       setTimeout(() => {
//         if(this.state === "pending") {
//           this.reason = reason;
//           this.state = 'rejected';
//           this.rejectedCallback.forEach (cb => cb(reason))
//         }
//       }, 0)
//     };
//     try {
//       executor(resolve, reject);
//     } catch (err) {
//       reject(err);
//     }
//   }

//   then(onResolved, onRejected) {
//     let promise2 = null
//     onResolved = typeof onResolved === 'function' ? onResolved:  value => value;
//     onRejected = typeof onRejected === 'function' ? onRejected : value => value;
//     if(this.state === 'fulfilled') {
//       return promise2 = new Promise((resolve,reject)=> {
//         try {
//           let res = onResolved(this.value);
//           if(res instanceof Promise) {
//             res.then(resolve, reject);
//           } else {
//             resolve(res);
//           }
//         } catch (err) {
//           reject(err);
//         }
//       })
//     }
//     if(this.state === 'rejected') {
//       return promise2 = new Promise((resolve,reject)=> {
//         try {
//           let res = onRejected(this.reason);
//           if(res instanceof Promise) {
//             res.then(resolve, reject);
//           } else {
//             resolve(res);
//           }
//         } catch (err) {
//           reject(err);
//         }
//       })
//     }
//     if(this.state === 'pending') {
//       this.resolveCallback.push(onResolved);
//       this.rejectedCallback.push(onRejected);
//     }
//   }
//   catch (onRejected) {
//     return this.then(null, onRejected);
//   }
// }
