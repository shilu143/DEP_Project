const express = require('express');
const { Server } = require('ws');
const sendMail = require("./controller/sendMail");

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

wss.on('connection', function(ws, req) {
    ws.on('message', message => {
        var dataString = message.toString();
        console.log("shilu");
        console.log(dataString);
        /* ws.send("ashish"); */
        sendMail(dataString);
    })
});