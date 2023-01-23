const nodemailer = require("nodemailer");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const otpModel = require('../models/otpModel');
const saltRounds = 10;

const sendMail = async (req, res, next) => {
    let targetEmail = req.body.username;
    let targetRole = 0;
    let newHash;
    let OTP = Math.floor(10000 + Math.random() * 90000); //5 digit OTP
    const saltRounds = await bcrypt.genSalt(10);
    await bcrypt.hash(String(OTP), saltRounds).then(function (hash) {
        newHash = hash;
    });


    // const newEntry = new otpModel({
    //     userName: targetEmail,
    //     otp: newHash
    // });

    // await newEntry.save();
    // await otpModel.findOneAndUpdate({userName:targetEmail}, {otp:newHash}, {upsert: true}, function(err, doc) {
    //     if (err) return res.send(500, {error: err});

    //     // return res.send('Succesfully saved.');
    // });
    let isAvailable = null;
    await otpModel.find({ userName: targetEmail }).then(result => {
        isAvailable = result;
        
    });
    // console.log(isAvailable);

    const newEntry = new otpModel({
        userName: targetEmail,
        otp: newHash
    });
    if (isAvailable.length == 0 ) {
      
        console.log("data unavailable");
        await newEntry.save();
    }
    else
    {
        console.log("data available");
        await otpModel.findOneAndDelete({userName:targetEmail})
        .then( () => {
            newEntry.save();
        }) 

    }



    const msg = {
        from: "Email Verification",
        to: targetEmail,
        subject: "One Time Password (OTP) for your login",
        text: `Use ${OTP} as One Time Password (OTP) to log in to your account. This OTP is valid for 5 minutes.${'\n\n'}Please do not share this OTP with anyone for security reasons.`
    };

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
        if (err) {
            console.log("Something went wrong, ", err);
            res.send("<h1>Something went wrong :(</h1>");
        }
        else {
            console.log("Message sent successfully");
            res.send("<h1>Message sent successfully :)</h1>");
        }
    });
    res.cookie('userName', targetEmail);
    res.redirect('/login/otp');

};

module.exports = sendMail;