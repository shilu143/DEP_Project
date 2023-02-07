const mongoose = require('mongoose');
bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const otpModel = require('../models/otpModel');

const otpverify = async (email,userotp) => {
    let otpflag = 0;
    let result;
    await otpModel.findOne({userName : email}).then(_result=>{
        result = _result
     });

     await bcrypt.compare(userotp,String(result.otp)).then(_result=>{
        console.log("Login result : ",_result);    
        // otpflag = _result;   
        if(_result==true){
            otpflag = 1;
            console.log("assigned 1 ", otpflag);
        }      
    });
    console.log(otpflag);
    return otpflag;
}

module.exports = otpverify;
