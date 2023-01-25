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
    const role = Number(req.cookies.role);
    let result;
    await otpModel.findOne({userName : targetEmail}).then(_result=>{
       result = _result
    });

    
    await bcrypt.compare(otp,String(result.otp)).then(_result=>{
        console.log("Login result : ",_result);
        if(_result === true) {
            // res.cookie("loggedin", "true");
            req.session.role = Number(role);
            if(role === 0) {
                res.redirect('/student/dashboard');
            }
            else if(role === 1){
                res.redirect('/instructor/dashboard');
            }
            else if(role === 2) {
                res.redirect('/advisor/dashboard');
            }
        }
        else {
            res.send("Invalid OTP");
        }
    });
}
module.exports = verifyOtp;

