const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { PORT } = require('./config/config');

app.listen(PORT ,(err) => {
	if (err) console.log(err);
	else console.log(`Running on port ${PORT}`);
});