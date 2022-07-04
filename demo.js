let payload = [{n:1},{n:1},{n:2}];

function check() {
    for (let i in payload) {
        if(payload.findIndex((e)=>e.n==payload[i].n)!=i){
            return 'Duplicate Entry!';
        }
    };
}

console.log(check());