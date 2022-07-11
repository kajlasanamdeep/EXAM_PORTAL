let payload = [10,10,10,5];
 console.log(payload.filter((e,i,arr)=>arr.indexOf(e)==i));

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

// console.log(check());