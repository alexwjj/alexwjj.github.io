var longestCommonPrefix = function (strs) {
	if (strs.length === 0) return ''
	// 寻找数组中最短的字符串，可通过length排序找到
	let arrMap = strs.map(v => {
		return {
			length: v.length,
			value: v
		}
	})
	arrMap.sort((a, b) => a.length - b.length);

	// 每次对最短字符串删除最后一位，然后和strs的每一项开头就行比对
	// 注意循环次数是arrMap中长度最长的，排过序的取最后一个就行
	let miniStr = arrMap[0].value;
	let miniArr = miniStr.split('');
	for (let i = 0; i < arrMap[arrMap.length - 1].length; i++) {
		if (strs.every(v => v.startsWith(miniStr))) {
			return miniStr
		} else if (miniArr.length) {
			miniArr.pop()
			miniStr = miniArr.join('');
		} else {
			miniStr = ''
		}
	}
	return miniStr
};