const mongoose = require('mongoose');
const adminHandler = require('../handlers/admin.handler')

module.exports.approveOrDeclineExaminer =  async function(req,res) {
    let payload = req.body;

    let responseData = await adminHandler.approveOrDeclineExaminer(payload);

}