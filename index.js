const connection = require('./db/connection');

connection.connect().then((connected)=>{
    console.log(connected);
}).catch((error)=>{
    console.log("Database Connection Error:",error);
});