const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const otpSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        expires:'5m',
        default:Date.now
    }
});

const otpModel = mongoose.model('otp',otpSchema);

module.exports = otpModel;