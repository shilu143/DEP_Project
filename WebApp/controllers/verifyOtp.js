const bcrypt = require('bcrypt');
const saltRounds = 10;
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const otpModel = require("../models/otpModel");
// const pass;


// bcrypt.hash(pass, saltRounds, function(err, hash) {
//     bcrypt.compare(pass, hash, function(err, result) {
//         console.log(result);
//     });
// });
const verifyOtp = async (req,res)=>{
    const otp = String(req.body.otp);
    const targetEmail = req.cookies.userName;
    let result;
    await otpModel.findOne({userName : targetEmail}).then(_result=>{
       result = _result
    });

    
    await bcrypt.compare(otp,String(result.otp)).then(_result=>{
        console.log("Login result : ",_result);
        res.cookie("loggedin", "true");
        res.redirect('/dashboard');
    });
    
    // res.send("Otp Checking");
    


}
module.exports = verifyOtp;

