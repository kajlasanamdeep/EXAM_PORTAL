const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { PORT } = require('./config/config');
const connection = require('./db/connection');

connection.connect().then((connected)=>{
    app.listen(PORT ,(err) => {
        if (err) throw err;
        else console.log(`Running on port ${PORT}`);
    });
    console.log(connected);
}).catch((error)=>{
    console.log("Database Connection Error:",error);
});