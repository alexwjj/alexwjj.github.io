let p1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('p1');
	},3000)
})
let p2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('p2');
	},2000)
})

let p3 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('p3');
	},2000)
})
Promise.allSettled = function(promises) {
    return new Promise(function(resolve, reject) {
        if (!Array.isArray(promises)) {
            return reject(
                new TypeError("arguments must be an array")
            );
        }
        let resolvedCounter = 0;
        const promiseNum = promises.length;
        // 统计所有的promise结果并最后返回
        const resolvedResults = new Array(promiseNum);
        for (let i = 0; i < promiseNum; i++) {
            Promise.resolve(promises[i]).then(
                function(value) {
                    resolvedCounter++;
                    resolvedResults[i] = value;
                    if (resolvedCounter == promiseNum) {
                        return resolve(resolvedResults);
                    }
                },
                // 错误结果
                function(reason) {
                    resolvedCounter++;
                    resolvedResults[i] = reason;
                    if (resolvedCounter == promiseNum) {
                        return resolve(reason);
                    }
                }
            );
        }
    });
};

Promise.allSettled([p3,p1,p2]).then(res => {
	console.log(res);
})