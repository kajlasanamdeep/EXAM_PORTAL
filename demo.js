let payload = [{n:10},{n:10},{n:10}];

// let total  = payload.map((e)=>e.n).reduce((a,b)=>a+b)
// let pass = parseInt((34/100)*total);
function check() {
    for (let current_index in payload) {
        let first_Index = payload.findIndex((e)=>e.n==payload[i].n);
        if(first_Index != current_index){
            return 'Duplicate Entry!';
        }
    };
}

console.log(check());