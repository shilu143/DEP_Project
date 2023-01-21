const nodemailer = require("nodemailer");
const sendMail = async (email) => {

    const msg = {
        from: "Email Verification",
        to: email,
        subject: "OTP VERIFICATION",
        text: "OTP="
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
            // res.send("<h1>Something went wrong :(</h1>");
        }
        else {
            console.log("Message sent successfully");
            // res.send("<h1>Message sent successfully :)</h1>");
        }
  });
};

module.exports = sendMail;