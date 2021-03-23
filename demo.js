/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
    // 双指针
    if (needle === "") return 0;
    for (let i = 0; i < haystack.length; i++) {
        // 先找第一位相等的
        if (haystack[i] === needle[0]) {
            let flag = true;
            for (let j = 1; j < needle.length; j++) {
                if (haystack[i + j] !== needle[j]) {
                    // 如果haystack下一位 和 needle中的不相等，当前i作废，开始下一轮循环
                    flag = false;
                    break;
                }
            }
            // 循环没有break，当前i有效
            if (flag) return i
        }

    }
    // 循环结束没有找到，就没有
    return -1
};