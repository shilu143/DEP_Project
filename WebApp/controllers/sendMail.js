const nodemailer = require("nodemailer");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const user = require('../models/user');
const saltRounds = 10;

mongoose.connect('mongodb://localhost:27017/userDB', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
});
// mongoose.set('strictQuery', true);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Connection Error : "));
db.once('open', () => {
    console.log('Database Connected');
});


const sendMail = async (req, res) => {
    let targetEmail = req.body.username;
    
    let newHash;
    let OTP = Math.floor(10000 + Math.random() * 90000); //5 digit OTP
    const saltRounds = await bcrypt.genSalt(10);
    await bcrypt.hash(String(OTP), saltRounds).then(function(hash) {
        newHash = hash;
    });
    const result = await user.findOneAndUpdate({userName : targetEmail}, {otp : newHash}, {new : true});
    console.log(result)

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
        if(err) {
            console.log("Something went wrong, ", err);
            res.send("<h1>Something went wrong :(</h1>");
        }
        else {
            console.log("Message sent successfully");
            res.send("<h1>Message sent successfully :)</h1>");
        }
  });

  db.close();
  res.redirect('/login/otp');
};

module.exports = sendMail;