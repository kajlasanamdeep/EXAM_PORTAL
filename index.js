/* importing modules */
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');

/* importing files */
dotenv.config({ path: './.env' });
const config = require('./config/config');
const connection = require('./db/connection');
const Routes = require('./routes');
const swaggerJson = require('./swagger.json');
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (['http://localhost:3000', 'http://localhost:8000','https://examination-portal.vercel.app'].indexOf(origin) === -1) {
            let msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    optionsSuccessStatus: 200
};

/* setting app middelwares */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use('/', Routes.user);
app.use('/docs',swaggerUI.serve,swaggerUI.setup(swaggerJson));
app.use('/admin', Routes.admin);
app.use('/examiner', Routes.examiner);
app.use('/student', Routes.student);

/* setting connection to mongodb atlas database */
connection.connect().then((connected) => {

    app.listen(config.PORT || 3000, (err) => {

        if (err) throw err;

        else console.log(`App Running on port ${config.PORT || 3000}`);
    });

    console.log(connected);

}).catch((error) => {

    console.log("Database Connection Error:", error);

});