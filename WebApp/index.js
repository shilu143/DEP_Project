const express = require('express');
const app = express();
const path = require('path');
const body_parser = require("body-parser");


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(body_parser.urlencoded({extended:true}))

app.get('/home', (req, res) => {
    console.log("Currently in home page");
    res.send('<h1>This is the Home page</h1>');
});

app.get('/login', (req, res) => {
    console.log("Currently in the login page");
    // res.send("<h1>Currently in the login page</h1>");
    res.render('login');
});

app.post('/login', (req, res) => {
    let {username, password} = req.body;
    console.log("username :", username);
    console.log("password :", password);
    res.redirect('/login');
});

app.listen(3000, () => {
    console.log("Listening to port 3000");
});