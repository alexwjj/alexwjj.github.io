const promise1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(1);
      resolve(1);
    }, 1000);
  });
}

const promise2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2);
      resolve(2);
    }, 1000);
  });
}
const promise3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(3);
      resolve(3);
    }, 1000);
  });
}
const promise4 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(4);
      resolve(4);
    }, 1000);
  });
}
const promiseArr = [promise1, promise2, promise3, promise4];

const pLimit = (promiseArr, limit) => {
  return new Promise((resolve) => {
    let resolvedCount = 0;
    let count = 0;
    let res = [];
    const len = promiseArr.length;

    const next = (p, index) => {
      p().then((r) => {
        res[index] = r;
        // 记录请求成功的数量
        resolvedCount++;
        // 数组还存在为执行的promise
        if (promiseArr.length) {
          const p = promiseArr.shift();
          next(p, count);
          count++;
        } else if (resolvedCount === len) {
          resolve(res);
        }
      });
    };
    // 1. 设置最开始的并发请求为最大值或全部promise数组
    while (count < limit && promiseArr.length) {
      const p = promiseArr.shift();
      next(p, count);
      count++;
    }
  });
};
pLimit(promiseArr, 2).then(res => {
  console.log(res);
})
// console.log(pLimit(promiseArr, 2));
