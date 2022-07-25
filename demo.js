// let payload = [10,10,10,5];
//  console.log(payload.filter((e,i,arr)=>arr.indexOf(e)==i));
// let total  = payload.map((e)=>e.n).reduce((a,b)=>a+b)
// let pass = parseInt((34/100)*total);
// function check() {
//     for (let current_index in payload) {
//         let first_Index = payload.findIndex((e)=>e.n==payload[i].n);
//         if(first_Index != current_index){
//             return 'Duplicate Entry!';
//         }
//     };
// }

// let names = ["s","a","a","s","s"];
// let unique = [];
// for (let i = 0; i< names.length; i++) {
//     let character = names[i];
//     for (let j = 0; j < names.length; j++) {
//         if(names[j]===character && i!=j){
//             break;
//         }
//         else if(names[j]===character && i===j){
//             unique.push(names[i]);
//         }
//     }
// }
// console.log(unique);

// let names = ["a","s","d"];
// let reverse = [];
// let n = names.length;
// for (let i = 1; i <= n; i++) {
//         reverse.push(names[n-i]);
// }
// console.log(reverse);

// const lower = ["a","b","c","d","e","f","g","h","i","j","k","l",'m',"n","o","p","q","r","s"];
// const upper = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S"];
// let str = "sanam kajla";
// let arr = [];
// let i = 0;
// while(arr.length != str.length){
//     arr.push(str[i]);
//     i++;
// }
// for (let i = 0; i < arr.length; i++) {
//     let element = arr[i];
//     for (let j = 0; j < lower.length; j++) {
//         let lwr = lower[j];
//         if(lwr===element){
//             arr[i] = upper[j];
//         }
//     }
// }
// str = "";
// i = 0;
// while(arr.length != str.length){
//     str += arr[i];
//     i++;
// }
// console.log(str);

// let Arr =[64,25,12,22,11];
// for (let i = 0; i < Arr.length; i++) {
//     for (let j = 0; j < Arr.length; j++) {
//         if(Arr[i] > Arr[j] && i < j ){
//             let temp = Arr[i];
//             Arr[i] = Arr[j];
//             Arr[j] = temp;
//         }
//     }
// }
// console.log(Arr);

// function reverse(str,rts="",i=1) {
//     if(i>str.length){
//         return rts;
//     }
//     rts += str[str.length - i];
//     return reverse(str,rts,i+1);
// }
// let str = "abcd";
// console.log(reverse(str));

// function compare(a, b, c) {
//     switch (true) {
//         case c >= b && c >= a:
//             return c;
//             break;
//         case b >= c && b >= a:
//             return b;
//             break;
//         default:
//             return a;
//             break;
//     }
// }
// console.log(compare(3,2,3));