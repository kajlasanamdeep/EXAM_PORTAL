const mongoose = require('mongoose');
const config = require('../config/db-config');
function connect() {
    return new Promise((connect,error)=>{
        const DBURL = `mongodb+srv://${config.USERNAME}:${config.PASSWORD}@${config.CLUSTER_LINK}.mongodb.net/${config.DB_NAME}?retryWrites=true&w=majority`;
        mongoose.connect(DBURL,(err,connected)=>{
            if(err) return error(err);
            else if(connected) return connect("Database Connected SuccessFully!");
        })
    })
}
module.exports = {connect};