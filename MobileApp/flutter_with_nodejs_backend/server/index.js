const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000; //port for https

const app = express()
    .use((req, res) => res.send("Hi there"))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ app });

wss.on('connection', function(ws, req) {
    ws.on('message', message => {
        var dataString = message.toString();
        const data = dataString.split(' ');
        const email=data[0]; const password=data[1];
        console.log(email);
        console.log(password);
    })
})