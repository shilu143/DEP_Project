const mongoose = require('mongoose');
bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const otpModel = require('../models/otpModel');

const otpverify = async (email,userotp) => {
    let result;
    await otpModel.findOne({userName : email}).then(_result=>{
        result = _result
     });

     await bcrypt.compare(userotp,String(result.otp)).then(_result=>{
        console.log("Login result : ",_result);    
    });
}

module.exports = otpverify;
