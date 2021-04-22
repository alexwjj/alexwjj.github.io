const num1 = "9007199254740991";
const num2 = "1234567899999999999";

const addNum = (num1: string, num2: string): string => {
  const maxLength = Math.max(num1.length, num2.length);
  //用0去补齐长度  为了进位
  num1 = num1.padStart(maxLength, "0");
  num2 = num2.padStart(maxLength, "0");
  //定义加法过程中需要用到的变量
  let t = 0;
  let f = 0; // 进位
  let sum = "";
  for (let i = maxLength - 1; i >= 0; i--) {
    t = parseInt(num1[i]) + parseInt(num2[i]) + f;
    f = Math.floor(t / 10);
    sum = (t % 10) + sum;
  }
  if (f === 1) {
    sum = "1" + sum;
  }
  return sum;
};

console.log(addNum(num1,num2),'addNum');