const express = require('express');
const { Server } = require('ws');
const sendMail = require("./controller/sendMail");
const emailValidator = require('deep-email-validator');
const validator = require("node-email-validation");
const mongoose = require('mongoose');
const userModel = require('./models/userModel');
const otpverify = require('./controller/otpverify')

let yo = -1;
let otpflag= 0;

require("dotenv").config();

mongoose.connect('mongodb://localhost:27017/userDB', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Connection Error : "));
db.once('open', () => {
    console.log('Database Connected');
});


const PORT = process.env.PORT || 3000; //port for https

/* const server = express().use((req, res) => res.send("Hi there")).listen(PORT, () => console.log(`Listening on ${PORT}`)); */
/* 
const server1 = express();

.get('/email',sendMail); */

const server = express().use("/",(req, res) =>{ 
    console.log("nishant"); res.send("Hi there");})
.listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

async function checkinn_delay_otp(email, otp){
   
    console.log(email);
    console.log(`otp found`);   
    
    otpflag = await otpverify(email,otp);
        // ws.send(otpflag);
        // console.log('passed');
     
}

async function isEmailValid(email) {
    return emailValidator.validate(email)
}

async function checkindatabase(email){
    console.log('check');
    await userModel.findOne({userName:email})
    .then( result => {
        console.log(result);
        if(result=== null){ 
            console.log('not found');
            yo= 0;  
        }else{
            console.log('found');  
            sendMail(email);
            yo= 1;           
        }        
    })
    .catch(err => {
        console.log(err);
        res.send("Sorry and Mail not sent");
    })
}

wss.on('connection', function(ws, req) {
    ws.on('message', message => {
        var dataString = message.toString();
        /* console.log("shilu"); */
        console.log(dataString);        
        /* console.log(validator.is_email_valid(yo));  */

        /* ws.send("ashish"); */
        if(validator.is_email_valid(dataString)) {
             checkindatabase(dataString).then(
                function shaurya(){
                    console.log(yo);
                    console.log('random');
                    ws.send(yo);
                }
             ); 
            /* console.log(yo); */
                   
        }
        else{
            var verify = dataString.split(" ");
            checkinn_delay_otp(verify[1], verify[0]).then(()=>{
                if(otpflag==1){
                    console.log('fuuuuuuuuuuuuuuuuu');
                }
                else{
                    console.log('shiiiiiiiiiiiiiiiii');
                }

                ws.send(otpflag);
                console.log('niiiiiiiiiiiiiiiiiiiiiii');
            });

            // var verify = dataString.split(" ");
            // console.log(verify[1]);
            // console.log(`otp found`);   
            
            // otpflag = otpverify(verify[1],verify[0]).then(function otp(){
            //     if(otpflag==true){console.log('GOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOt it');}
            //     else{console.log('NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOt');}
            //     ws.send(otpflag);
            //     console.log('passed');
            // }); 

            /* console.log(otpflag); */       
        }
    })
});