
// A、 B 、 C 是 3 个字符串。把 A 中包含的所有 B 都替换为 C ，如果替换以后还有 B 就继续替换，直到 A 不包含 B 为止。
// 1、请编写程序实现以上功能。不允许使用系统提供的字符串比较、查找和替换函数。

let a1 = 'aaabbbcccbbbffbbb';
let b1 = 'bbb';
let c1 = 'ddd';
 
function find(a,b,c){
	while(true){//直到a中没有b
		let num = a.indexOf(b);//确定a中b的开始下标
		// console.log(num)
		if(num != -1){//查找到
			let Aarr = a.split('');//转换成数组
			a = '';
			let count = 0;
			Aarr.map((item,index)=>{
				// console.log(item,index);
				if(index>=num && index<num+b.length){
					if(count == 0){
						a += c;
					}
					count ++;
				}else{
					a += Aarr[index];
				}
			})
		}else{
			return a;
		}
	}
}
let f = find(a1,b1,c1);
console.log(f);