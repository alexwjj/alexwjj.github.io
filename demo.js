function toD (str){
    let res = str.replace(/[A-Z]/g,function($0){
        console.log($0,'$0');
        return `-${$0.toLowerCase()}`;
    })
    console.log(res);
}
toD('aBcccDeee')

function toC (str){
    let res = str.replace(/-(.)/g,function($0,$1){
        return $1.toUpperCase();
    })
    console.log(res);
}
toC('a-bccc-deee')