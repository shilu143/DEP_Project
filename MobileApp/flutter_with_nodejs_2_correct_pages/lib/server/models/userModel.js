const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDB = new Schema({
    userName: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true
    },   
    otp: {
        type: String,
        expires: 20
    }
});

const userModel = mongoose.model('userModel',userDB);

module.exports = userModel;