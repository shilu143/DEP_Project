const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDB = new Schema({
    userName: {
        type: String,
        required: true
    },  
    otp: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model('otpModel',userDB);

module.exports = userModel;