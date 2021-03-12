function test<T>(arg: T[]): T {
    console.log(arg.length); 
    return arg[0];
}
test([1,2,3])