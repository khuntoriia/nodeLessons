/**
 *
 * Created by sylvie on 2016/6/3.
 */
function fibonacci(n){
    if(n<0){
        throw new Error('n should >= 0');
    }
    if(n===0){
        return 0;
    }
    if (n===1){
        return 1;
    }
    return fibonacci(n-1)+fibonacci(n-2);   // 1 1 2 3 5 8
}
if(require.main === module){
    var n = Number(process.argv[2]);
    console.log('fibonacci('+n+')='+fibonacci(n));
}
exports.fibonacci=fibonacci;