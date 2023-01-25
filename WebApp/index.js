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
const studentModel = require('./models/studentModel');
const takenModel = require('./models/takenModel');
const requestIns = require('./models/requestIns');
const statusModel = require('./models/statusModel');
const courseModel = require('./models/coursesModel');
const insRequestModel = require('./models/requestIns');
const advRequestModel = require('./models/requestsAdvisor');
const advisorModel = require('./models/advisor');
const AppError = require('./controllers/AppError');
const session = require('express-session');

const wrapAsync = (fn) => {
    return function(req, res, next) {
        fn(req, res, next).catch( e => next(e));
    }
};  

const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost:27017/userDB', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
});
// mongoose.set('strictQuery', true);

// mongoose.connect('mongodb+srv://AshishAlok:Test123@cluster0.4c754l6.mongodb.net/userDB', {
//     useNewUrlParser: true,
//     // useCreateIndex: true,
//     // useUnifiedTopology: true
// });

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Connection Error : "));
db.once('open', () => {
    console.log('Database Connected');
});

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));
app.set('views', path.join(__dirname, 'views'));
app.use(body_parser.urlencoded({extended:true}))
app.use(session({
    secret: process.env.SESSIONKEY,
    resave: true,
    saveUninitialized: true
}));

app.get('/home', (req, res) => {
    console.log("Currently in home page");
    res.send('<h1>This is the Home page</h1>');
});

app.get('/login', (req, res) => {
    if(req.session.role == null) {
        console.log("Currently in the login page");
        // res.send("<h1>Currently in the login page</h1>");
        req.session.destroy();
        res.render('login');
    }
    else if(req.session.role === 0) {
        res.redirect('student/dashboard');
    }
    else if(req.session.role === 1) {
        res.redirect('instructor/dashboard');
    }
    else if(req.session.role === 2) {
        res.redirect('advisor/dashboard');
    }
});

app.post('/login', wrapAsync(async (req,res,next)=>{
    
    const targetEmail = req.body.username;
    const role = Number(req.body.role);
    
        await userModel.findOne({userName:targetEmail, role : role})
        .then( result => {
            if(!result){
                res.send("User Not Found");
            }else{
                sendMail(req,res);
                req.session.emailEntered = true;
            }
        })
        .catch(err => {
            throw err;
        })
}));

app.get('/error', (req, res) => {
    res.render('error');
});

app.get('/student/dashboard', wrapAsync(async (req,res, next) => {
    if(req.session.role === 0) {
        let userName = req.cookies.userName;
        let role = req.cookies.role;
        await statusModel.find({studentId: userName}).then(
            (courses) => {
                res.render('student/dashboard', {courses});
            }
        )
    }
    else {
        res.redirect('/login');
    }
}));

app.post('/student/dashboard', wrapAsync(async (req, res, next) => {
    const { courseId, instId } = req.body;
    const userName = req.cookies.userName;
    console.log(courseId, instId);
    await statusModel.findOneAndUpdate({studentId : userName, courseId: courseId}, {status: 1}).
    then(() => {  
        requestIns.find({studId : userName, courseId : courseId}).then(
            (result) => {
                if(result.length === 0) {
                    const newEntry = new requestIns({
                    instId: instId,
                    studId: userName,
                    courseId: courseId
                })
                newEntry.save();
                }
                else {
                    // requestIns.findOneAndUpdate({_id : result._id}, {status: 1});
                }
            }
        )
        res.redirect('/student/dashboard');
    });
    
}));



app.get('/instructor/dashboard', wrapAsync(async (req,res)=>{
    if(req.session.role === 1) {
        let role = Number(req.cookies.role);
        let userName = req.cookies.userName;

        const data = await insRequestModel.find({instId:userName}).then(
            (requests) => {
                console.log(requests);
                res.render('instructor/dashboard', {requests});
            }
        );
    }
    else {
        res.redirect('/login');
    }
}));

app.post('/instructor/dashboard', wrapAsync( async (req,res)=>{
    let role = Number(req.cookies.role);
    let userName = req.cookies.userName;

    const studId = req.body.studId;
    const courseId = req.body.courseId;
    const isApproved = Number(req.body.isApproved);



    await insRequestModel.deleteOne({studId:studId,courseId :courseId}).then(
        (status)=>{
            console.log(status);
        }
    );
    const advisor =  await advisorModel.findOne({});
    
    const advId = String(advisor.advId);

    if(isApproved === 1)
    {
        await advRequestModel.insertMany({
            advId :advId,
            studId:studId,
            courseId:courseId
        });
        await statusModel.findOneAndUpdate({studentId:studId,courseId:courseId},{status:2}).then(
            (result)=>
            {
                console.log(result);
            }
        );
    }
    else if(isApproved === 0) {
        await statusModel.findOneAndUpdate({studentId:studId,courseId:courseId},{status:-1}).then(
            (result)=>
            {
                console.log(result);
            }
        );
    }

    await insRequestModel.find({instId:userName}).then(
        (requests) => {
            res.render('instructor/dashboard', {requests});
        }
    );
}));


app.get('/advisor/dashboard',  async (req,res)=>{
    if(req.session.role === 2) {
        let role = Number(req.cookies.role);
        let userName = req.cookies.userName;

        const data = await advRequestModel.find({advId:userName}).then(
            (requests) => {
                // console.log(requests);
                res.render('advisor/dashboard', {requests});
            }
        );
    }
    else {
        res.redirect('/login');
    }
});

app.post('/advisor/dashboard',wrapAsync( async (req,res, next)=>{
    let role = Number(req.cookies.role);
    let userName = req.cookies.userName;

    const studId = req.body.studId;
    const courseId = req.body.courseId;
    const isApproved = Number(req.body.isApproved);
    // console.log(studId,courseId);


    await advRequestModel.deleteOne({studId:studId,courseId :courseId}).then(
        (status)=>{
            console.log(status);
        }
    );
    
        if(isApproved === 1)
        {
            await statusModel.findOneAndUpdate({studentId:studId,courseId:courseId},{status:3}).then(
                (result)=>
                {
                    console.log(result);
                }
            );

        }
        else if(isApproved ===0 )
        {
            await statusModel.findOneAndUpdate({studentId:studId,courseId:courseId},{status:-1}).then(
                (result)=>
                {
                    console.log(result);
                }
            );
        }
    await advRequestModel.find({advId:userName}).then(
        (requests) => {
            // console.log(requests);
            res.render('advisor/dashboard', {requests});
        }
    );
}));


app.get('/login/otp', (req,res, next) => {
    // console.log(req.cookies);
    if(req.session.emailEntered === true) {
        res.render('otp');
    }
    else {
        res.redirect('/login');
    }
});

app.post('/login/otp', wrapAsync( async (req,res, next) => {
        verifyOtp(req,res);
}));

app.post('/logout', (req, res) => {
    // req.session.role = null;
    req.session.destroy();
    res.redirect('login');
})

app.get('*', (req, res) => {
    res.render('error');
});


app.use((err,req,res,next) => {
    const {status = 500, message = "Something Went Wrong"} = err;
    // res.status(status).send(message);
    res.render('error');
});
// app.post('/login/sendMail', sendMail);

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});