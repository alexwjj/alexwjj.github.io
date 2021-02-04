// function toD (str){
//     let res = str.replace(/[A-Z]/g,function($0){
//         console.log($0,'$0');
//         return `-${$0.toLowerCase()}`;
//     })
//     console.log(res);
// }
// toD('aBcccDeee')

// function toC (str){
//     let res = str.replace(/-(.)/g,function($0,$1){
//         return $1.toUpperCase();
//     })
//     console.log(res);
// }
// toC('a-bccc-deee')

// class PubSub {
//     constructor() {
//         this.subers = [];
//     }
//     Sub(topic,callback){
//         let callbacks = this.subers[topic];
//         if(!callbacks){
//             this.subers[topic] = [callback];
//         } else {
//             this.subers[topic].push(callback)
//         }
//     }
//     Pub(topic, args) {
//         this.subers[topic].forEach(callback => callback(args))
//     }
//     remove(topic, callback) {
//         this.subers[topic] = this.subers[topic].filter(cb => cb !== callback)
//     }
// }

// let pubSub = new PubSub()

// pubSub.Sub('a', (msg)=>{
//     console.log('a' + msg);
// })
// pubSub.Sub('b', (msg)=>{
//     console.log('b' + msg);
// })
// pubSub.remove('a')
// pubSub.Pub('b', '订阅者收到了消息')

// class Sub {
//     constructor() {
//         this.obers = []
//     }
//     add(observer) {
//         this.obers.push(observer)
//     }
//     notify(args) {
//         this.obers.forEach(ob => ob.update(args));
//     }
//     remove(observer) {
//         this.obers = this.obers.filter(ob => ob !== observer)
//     }
// }

// class Ob {
//     update(args) {
//         console.log(args);
//     }
// }

// let ob1 = new Ob();
// let ob2 = new Ob();

// let sub = new Sub();

// sub.add(ob1);
// sub.add(ob2);
// sub.remove(ob1)
// sub.notify('目标发送了变化')

// let arr = [1,2,3,4,5]

// arr.sort(()=> {
//     return Math.random() - 0.5
// })
// console.log(arr);
// 输入字符串 '1,5,3,2,10,8,7' 输出字符串 '1~3,5,7~8,10'
const test = (str) => {
    const arr = str.split(',').sort((a,b)=> {
        return a-b
    })
    // console.log(arr);
    // [1,2,3,5,7,8,10]
}
test('1,5,3,2,10,8,7')