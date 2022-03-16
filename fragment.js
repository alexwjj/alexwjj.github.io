// function mySetTimeout(fn, delay = 4) {
//   const now = Date.now();
//   const run = now + delay;
//   while (true) {
//     if (Date.now() === run) {
//       fn();
//       return;
//     }
//   }
// }

// function test() {
//   console.log('1');
// }

// mySetTimeout(test, 1000)


const a =(...rest) => {
  console.log(rest);
}
a(1,2)

// function a() {
//   console.log(...arguments);
// }
// a(1,2)