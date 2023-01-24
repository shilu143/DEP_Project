const nodemailer = require("nodemailer");
bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const mongoose = require('mongoose');
const otpModel = require('../models/otpModel');

/* await bcrypt.hash */

const sendMail = async (email) => {

    let OTP = Math.floor(10000 + Math.random() * 90000);
    const saltRounds = await bcrypt.genSalt(10);
    await bcrypt.hash(String(OTP), saltRounds).then(function(hash) {
        newHash = hash;
        /* console.log(newHash); */
    });
    const result = await userModel.findOneAndUpdate({userName : email}, {otp : newHash}, {new : true});
    
    let isAvailable = null;
    await otpModel.find({ userName: email}).then(result => {
        isAvailable = result;
        
    });
    // console.log(isAvailable);

    const newEntry = new otpModel({
        userName: email,
        otp: newHash
    });
    if (isAvailable.length == 0 ) {
        console.log("data not available");
        await newEntry.save();
    }
    else
    {
        console.log("data available");
        await otpModel.findOneAndDelete({userName:email})
        .then( () => {
            newEntry.save();
        }) 
    }
    /* console.log(result);  */

    const msg = {
        from: "One Time Password (OTP) for your login",
        to: email,
        subject: "OTP VERIFICATION",
        text: `Use ${OTP} as One Time Password (OTP) to log in to your account. This OTP is valid for 5 minutes.\nPlease do not share this OTP with anyone for security reasons.`
    };

    console.log(OTP);

  // connect with the smtp
    let transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.userName,
            pass: process.env.password
        },
        port: 465,
        host: 'smtp.gmail.com'
    });

  let info = await transporter.sendMail(msg, err => {
        if(err) {
            console.log("Something went wrong, ", err);
            // res.send("<h1>Something went wrong :(</h1>");
        }
        else {
            console.log("Message sent successfully");
            // res.send("<h1>Message sent successfully :)</h1>");
        }
  });

  /* db.close(); */

};

module.exports = sendMail;