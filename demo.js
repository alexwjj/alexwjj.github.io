// // 如下的观察者模式，请实现observable和observe两个函数
// const person = observable({
//     name: '张三',
//     age: 20
//   });
//   function print() {
//     console.log(`${person.name}, ${person.age}`)
//   }
//   observe(print);
//   person.name = '李四'; // 输出 李四, 20
  
//   const observable = (obj) => {
//    return object.defineProperty(
//       obj,'', 
//       get (val) {
//         return val
//       }
//      se
//     )se
//    proxy
    
//   }
//   const observe = (fn) => {
    
//   }
  
  
//   题目2
  // 实现一个函数，将对象数组key相同的value值累加 
  // 比如，[{a:1},{b:1},{a:1},{c:1},{b:1}] => [{a:2},{b:2},{c:1}]
  
//   const keyAdd = (arr) => {
//     let res = [];
//     arr.forEach( (v1,i) => {
//       arr.forEach( (v2,j) => {
//       if(i !== j && (Object.keys(v1)[0] === Object.keys(v2)[0])){
//         let key = Object.keys(v1)[0]
//         let obj = {};
//         obj[key] = Object.values(v1)[0] + Object.values(v2)[0]
//         res.push(obj)
//       } else {
//         res.push(v2)
//       }
//       }) 
//     }) 
//     return res
//   }
  
//   console.log(keyAdd([{a:1},{b:1},{a:1},{c:1},{b:1}]), 'keyAdd')

// var findDuplicate = function(nums) {
//     let map = new Map();
//     nums.forEach(v => {
//         if(!map.get(v)) {
//             map.set(v, 1)
//         } else {
//             map.set(v, map.get(v) + 1)
//         }
//     })
//     let res = 0;
//     map.forEach((v,k, map) => {
//         if(v > 1) {
//             res = k
//         }
//     })
//     return res;
// };
// console.log(findDuplicate([3,1,3,4,2,]));