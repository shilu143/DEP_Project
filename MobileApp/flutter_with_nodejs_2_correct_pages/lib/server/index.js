const express = require('express');
const { Server } = require('ws');
const sendMail = require("./controller/sendMail");
const emailValidator = require('deep-email-validator');
const validator = require("node-email-validation");

require("dotenv").config();


const PORT = process.env.PORT || 3000; //port for https

/* const server = express().use((req, res) => res.send("Hi there")).listen(PORT, () => console.log(`Listening on ${PORT}`)); */
/* 
const server1 = express();

.get('/email',sendMail); */

const server = express().use("/",(req, res) =>{ 
    console.log("nishant"); res.send("Hi there");})
.listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

async function isEmailValid(email) {
    return emailValidator.validate(email)
}

wss.on('connection', function(ws, req) {
    ws.on('message', message => {
        var dataString = message.toString();
        console.log("shilu");
        console.log(dataString);        
        let yo=dataString;
        console.log(validator.is_email_valid(yo)); 

        /* ws.send("ashish"); */
        sendMail(dataString);
    })
});