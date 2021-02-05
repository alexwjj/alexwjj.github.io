// =====================================================
// 欢迎参加有赞前端 Coding 面试
// =====================================================
// 界面介绍：
//   上方设置按钮可以切换语言、字体大小、主题
//   右侧控制台可以显示代码执行结果，可用于编码过程中的 DEBUG
// =====================================================
// Coding 须知：
//   本次 Coding 时间限制为 45 分钟，共 3 道题，请量力答题
// =====================================================

/**
 * 1. 实现一个函数，判断两个变量值是否相等
 * 
 * 注意
 * - 数据类型不限于示例，尽可能考虑边界
 * - function 引用相等即可
 */
const foo1 = {
    a: 1,
    b: '1',
    c: NaN,
    d: [{
        a: 1,
        b: 2
    }],
    f: {
        a: 1
    },
    g: null
}

const foo2 = {
    a: 1,
    b: '1',
    c: NaN,
    d: [{
        a: 1,
        b: 2
    }],
    f: {
        a: 1
    },
    g: null
}

function isEqual(target1, target2) {
    if(target1 === target2) return true;
    // 对象
    let t1Keys = Object.keys(target1);
    let t2Keys = Object.keys(target2);
    if(t1Keys.length === t2Keys.length) {
        for(let i=0; i<t1Keys.length; i++) {
            for(let j=0; j<t2Keys.length; j++) {
                if(isNaN(target1[t1Keys[i]]) || isNaN(target2[t2Keys[j]])) {
                  return Object.is(target1[t1Keys[i]],isNaN(target2[t2Keys[j]]))
                }
                if(Array.isArray(target1[t1Keys[i]]) && Array.isArray(target2[t1Keys[2]])) {
                    target1[t1Keys[i].forEach(v => {
                        target2[t1Keys[2]].forEach(j => {
                            isEqual(v,j)
                        })
                    })
                }
                if(target1[t1Keys[i]] !== target2[t2Keys[j]]) {
                    return false
                }
            }
        }
    } else {
        return false
    }

}
console.log(isEqual(foo1, foo2), 'isEqual');


/**
 * 2. 实现 getValue 函数来获取path对应的值
 */
var object = { 'a': [{ 'b': { 'c': 3 } }] }; // path: 'a[0].b.c'
var array = [{ "a": { b: [1] } }]; // path: '[0].a.b[0]'

function getValue(target, valuePath, defaultValue) {
    let res = ''
    if(Array.isArray(target)) {

    };
    if(Object.prototype.toString.call(target) === '[object Object]') {
        let pathArr = valuePath.split('.'); // [a[0],b,c]
        pathArr.forEach(item => {
            if(item.includes('[')) {
                let iItem = 0;
                item.match(/[0-9]/g, function($0) {
                    iItem = $0
                })
                let key = item.split('[')[0]
                res = target[key][iItem]
            } else {
                res = res[item]
            }
        })
    }
    if(!res) {
        return defaultValue
    }
}

console.log(getValue(object, 'a[0].b.c', 0));  // 输出3
console.log(getValue(array, '[0].a.b[0]', 12)); // 输出 1
console.log(getValue(array, '[0].a.b[0].c', 12));  // 输出 12


/**
 * 问题 3
 * 将一天24小时按每半小划分成48段，我们用一个位图表示选中的时间区间，例如`110000000000000000000000000000000000000000000000`，
 * 表示第一个半小时和第二个半小时被选中了，其余时间段都没有被选中，也就是对应00:00~01:00这个时间区间。一个位图中可能有多个不连续的
 * 时间区间被选中，例如`110010000000000000000000000000000000000000000000`，表示00:00-1:00和02:00-02:30这两个时间区间被选中了。
 * 
 * 要求：写一个函数timeBitmapToRanges，将上述规则描述的时间位图转换成一个选中时间区间的数组。
 * 示例输入：`"110010000000000000000000000000000000000000000000"`
 * 示例输出：`["00:00~01:00", "02:00~02:30"]`
 */
function timeBitmapToRanges(str) {
}

console.log(timeBitmapToRanges('110010000000000000000000000000000000000000000000'))
console.log(timeBitmapToRanges('110011000000110000000000000000000000000000001111'))