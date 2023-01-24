const express = require('express');
const app = express();
const path = require('path');
const body_parser = require("body-parser");
const sendMail = require("./controllers/sendMail");
const mongoose = require('mongoose');
const userModel = require("./models/userModel");
const cookieParser = require("cookie-parser");
const verifyOtp = require("./controllers/verifyOtp")
require('dotenv').config();


const PORT = process.env.PORT || 3000;
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

app.use(cookieParser());
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

app.post('/login',async (req,res,next)=>{
    const targetEmail = req.body.username;
    const role = Number(req.body.role);
    
    await userModel.findOne({userName:targetEmail, role : role})
    .then( result => {
        if(!result){
            res.send("User Not Found");
            // next(new Error("wrong Email"));
        }else{
            sendMail(req,res);

        }
        
    })
    .catch(err => {
        console.log(err);
        res.send("Sorry and Mail not sent");
    })

});

app.get('/dashboard',(req,res)=>{
    let role = req.cookies.role;
    res.render('dashboard', {role});
});
app.get('/login/otp', (req,res)=>{
    // console.log(req.cookies);
    res.render('otp');
});
app.post('/login/otp',async (req,res)=>{
    verifyOtp(req,res);

});


app.use((err,req,res,next)=>{

    res.send(err);
});
// app.post('/login/sendMail', sendMail);

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});