function format(start, end) {
    let endHour = (end / 2).toFixed(1);
    let startHour = (start / 2).toFixed(1);
    let reg = /(\d+)\.(\d+)/;
    const endRes = endHour.match(reg);
    const startRes = startHour.match(reg);
    return (
        addZero(startRes[1]) +
        ':' +
        addZero(startRes[2]) +
        '~' +
        addZero(endRes[1]) +
        ':' +
        addZero(endRes[2])
    );
}
function addZero(num) {
    num = num === '5' ? '30' : num;
    return num.length > 1 ? num : '0' + num;
}
function timeBitmapToRanges(timeBitmap) {
    let timeArr = timeBitmap.split('').map(v => +v);
    const res = [];
    let range = {};
    let start = 0;
    for (let i = 0; i <= timeArr.length; i++) {
        if (timeArr[i]) {
            start++;
        }
        if (!timeArr[i] && timeArr[i - 1]) {
            range[i] = start;
            start = 0;
        }
    }
    for (let j in range) {
        res.push(format(parseInt(j - range[j]), parseInt(j)));
    }
    return res;
}

console.log(
    timeBitmapToRanges('110010000000000000001110000000000000000000000111')
);
// [ '00:00~01:00', '02:00~02:30', '10:00~11:30', '22:30~24:00' ]
