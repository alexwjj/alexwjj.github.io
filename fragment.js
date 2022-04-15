// var name = 'map';
// function print() {
//    console.log(this.name);
// }

// var object = {
//    name: 'object',
//    getNamePrinter: function(fn) {
//       fn && fn();
//       return ()=> {
//        	console.log(this.name);
//       }
//    }
// };

// const arrowFunction = object.getNamePrinter(print)
// arrowFunction();

// const getNamePrinter = object.getNamePrinter;
// const arrowFunction1 = getNamePrinter(print)
// arrowFunction1();

// const quickSort = (arr) => {
//   if(arr.length < 2) return arr;
//   const markIndex = Math.floor(arr.length / 2);
//   const markValue = arr[markIndex];
//   const left = [];
//   const right = [];
//   for(let i = 0; i <arr.length; i++) {
//     if(arr[i] < markValue) {
//       left.push(arr[i])
//     } else if(arr[i] > markValue) {
//       right.push(arr[i])
//     }
//   }
//   return [...quickSort(left), markValue, ...quickSort(right)];
// }
// console.log(quickSort([2,5,1,9,6,3]), '1111');


// var sortArray = function(nums) {
//   if(nums.length <=1) return nums;
//   const markIndex = Math.floor(nums.length / 2);
//   const markValue = nums.splice(markIndex,1)[0];
//   const left = [];
//   const right = [];
//   for (var i = 0; i < nums.length; i++){
//     if(nums[i] < markValue){
//       left.push(nums[i]);
//     } else {
//       right.push(nums[i]);
//     }
//   }
//   return [...sortArray(left), markValue, ...sortArray(right)]
// };
// console.log(sortArray([5,1,1,2,0,0]));


// var currying = function(fn) {
//   var args = Array.prototype.slice.call(arguments, 1);
//   return function() {
//     if (arguments.length) {
//       [].push.apply(args, arguments); // 传入了参数，把参数保存下来
//       return arguments.callee; // 返回这个函数的引用
//     } else {
//       return fn.apply(this, args); // 没传参数时，调用这个函数
//     }
//   }
// }

// function sum() {
//   const args = [].slice.call(arguments);
//   return args.reduce((prev, cur) => prev + cur)
// }
// const sumC = currying(sum)
// sumC(1,2)
// sumC(1,2)
// console.log(sumC(), 'sum()');


// function uncurry() {
//   let fn = this;
//   return function() {
//     const obj = Array.prototype.shift.call(arguments);
//     return fn.apply(obj, arguments);
//   }
// }

// function get (source, path, defaultValue = undefined) {
//   // a[3].b -> a.3.b
//   const paths = path.replace(/\[(\d+)\]/g,'.$1').split('.');
//   let result = source;
//   for(let p of paths) {
//     result = result[p];
//     if(result === undefined) {
//       return defaultValue;
//     }
//   }
//   return result;
// }

// const obj = { a:[1,2,3,{b:1}]}
// const value = get(obj, 'a[3].b', 3)
// console.log(value, 'value');


// function deepCopy(target) {
//   let result = Array.isArray(target) ? [] : {}
//   const type = (value) => {
//     const t = Object.prototype.toString.call(value);
//     return t.slice(8, t.length-1)
//   }
//   for (const key in target) {
//     if(target.hasOwnProperty(key)) {
//       const value = target[key]
//       // date
//       // reg
//       // func
//       // null
//       if(value === null) {
//         result[key] = null
//       } else if(typeof value === 'object') {
//         result[key] = deepCopy(value)
//       } else if(type === 'Function') {
//         result[key] = new Function(value)
//       } else if(type === 'Date') {
//         result[key] = new Date(value)
//       } else if(type === 'RegExp') {
//         result[key] = new RegExp(value)
//       } else {
//         result[key] = value
//       }
//     }
//   }
//   return result
// }

// function throttle(fn, delay = 500) {
//   let timer = null;
//   let start = Date.now();
//   return function() {
//     let now = Date.now();
//     if(now - start > delay) {
//       clearTimeout(timer);
//       fn.apply(this, arguments);
//       start = now;
//     };
//     if(!timer) {
//       timer = setTimeout(() => {
//         fn.apply(this, arguments);
//         timer = null;
//       }, delay)
//     }
//   }
// }

// function myCall(context, args) {
//   context = context || window;
//   let fn = Symbol();
//   context[fn] = this;
//   const result = context.fn(...args);
//   delete context[fn];
//   return result;
// }

// function myBind(context, args) {
//   const fn = Symbol();
//   context[fn] = this;
//   return function() {
//     context[fn].apply(this, args);
//     delete context[fn];
//   }
// }

// class Notify {
//   constructor() {
//     this.observers = [];
//   }
//   add(observer) {
//     this.observers.push(observer);
//   }

//   remove(observer) {
//     this.observers = this.observers.filter(ob => ob !== observer)
//   }

//   notify() {
//     this.observers.forEach(ob => ob.update(...arguments));
//   }
// }

// class Observe {
//   constructor(eventName) {
//     this.eventName = eventName;
//   }

//   update() {
//     console.log(this.eventName, 'this.eventName');
//     console.log(...arguments, 'params');
//   }
// }

// const ob1 = new Observe('J1');
// const ob2 = new Observe('J2');

// const Notifyer = new Notify();
// Notifyer.add(ob1)
// Notifyer.add(ob2)

// Notifyer.notify('hello')


// 写个add函数, 奇数次执行输出1，偶数次执行输出0
// add() 1
// add() 0
// add() 1
// add() 0
// function addS() {
//   // this.cache = this.cache || 0;
//   // let cache = 0;
//   // return (function() {
//   //   cache ++
//   //   if (this.cache % 2 === 0) {
//   //     return 0
//   //   } else {
//   //     return 1
//   //   }
//   // })()
//   let i = 0;
//   return function() {
//     i++;
//       if (i % 2 === 0) {
//         return 0
//       } else {
//         return 1
//       }
//   }
// }
// const add = addS()
// console.log(add(), 'J');
// console.log(add(), 'J');
// console.log(add(), 'J');
// console.log(add(), 'J');

// var result = [];
// var a = 3;
// var total = 0;
// function foo(a) {
//   for (let i = 0; i < 3; i++) {
//     result[i] = function() {
//       total += i * a;
//       console.log(total);
//     }
//   }
// }

// foo(1);
// result[0](); //3
// result[1](); //6
// result[2](); //9


// function addS() {
//   let i = -1;
//   return function() {
//     i++;
//     if(i % 2 === 0) {
//       return 0;
//     } else {
//       return 1;
//     }
//   }
// }
// const add = addS();
// console.log(add());
// console.log(add());
// console.log(add());
// console.log(add());

// async function async1() {
//   console.log('async1 start');
//   await async2();
//   console.log('async1 end');
// }
// async function async2() {
//   console.log('async2 start');
//   return new Promise((resolve, reject) => {
//       resolve();
//       console.log('async2 promise');
//   })
// }

// console.log('illegalscript start');

// setTimeout(function () {
//   console.log('setTimeout');
// }, 0);

// async1();

// new Promise(function (resolve) {
//   console.log('promise1');
//   resolve();
// }).then(function () {
//   console.log('promise2');
// }).then(function () {
//   console.log('promise3');
// });
// console.log('illegalscript end');





// var addStrings = function(num1, num2) {
//   num1 = num1.split("").reverse();
//   num2 = num2.split("").reverse();
//   const len = Math.max(num1.length, num2.length);
//   let flag = 0;
//   let result = [];
//   for (let i = 0; i < len; i++) {
//     let n1 = +num1[i] || 0;
//     let n2 = +num2[i] || 0;
//     let sum = n1 + n2 + flag;
//     if(sum > 9) {
//       sum = sum % 10;
//       flag = 1;
//     }
//     result.push(sum)
//   }
//   if(flag) {
//     result.push(flag)
//   }
//   return result.reverse().join("");
// };

// console.log(addStrings('11111', '22222'));


// console.log('log1');
// setTimeout(() => {
//   console.log('timeout1');
//   setTimeout(() => {
//     console.log('timeout2');
//   }, 0);
//   new Promise((resolve,reject) => {
//     console.log('promise1');
//     resolve();
//   }).then(() => {
//     console.log('promise2');
//   })
// },0)

// new Promise((resolve,reject) => {
//   console.log('promise3');
//   reject();
// }).catch(() => {
//   console.log('promise4');
// })
// console.log('log2');

// log1 p3 log2 p4 timeout1 p1 p2 timeout2

// Promise.reject(1).catch(err => {
//   console.log('catch');
//   throw err;
//   // return err
// }).then(e => {console.log(e, 'then')})
// .catch(e => {console.log(e)})

// const a=1
// const obj={
//     a:2,
//     show1:function(){
//         console.log(this.a)
//     },
//     show2:()=>{
//         console.log(this.a)
//     },
// }

// obj.show1() 
// obj.show2() 

// const func1=obj.show1 
// const func2=obj.show2 
// func1()
// func2()

function debounce(fn, delay = 500) {
  let timer = null;
  return function () {
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null
    }, delay)
  }
}

function throttle(fn, delay = 500) {
  let timer = null;
  let now = Date.now();
  return function(...args) {
    let start = Date.now();
    if(now - start >= delay) {
      fn.apply(this, args);
      clearTimeout(timer);
      start = now;
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null
    }, delay)
  }
}