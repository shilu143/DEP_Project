const mongoose = require('mongoose');
const user = require('../models/otpModel');

mongoose.connect('mongodb://localhost:27017/userDB', {
    useNewUrlParser: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Connection Error : "));
db.once('open', () => {
    console.log('Database Connected');
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    await user.deleteMany({});
    let c = new user ({
        userName : '2020csb1076@iitrpr.ac.in',
        otp : '',
    });
    await c.save();

    c = new user ({
        userName : '2020csb1126@iitrpr.ac.in',
        otp : '',
    });
    await c.save();

    c = new user ({
        userName : '2020csb1125@iitrpr.ac.in',
        otp : '',
    });
    await c.save();

     c = new user ({
        userName : '2020csb1103@iitrpr.ac.in',
        otp : '',
    });
    
    await c.save();
};

seedDB().then(() => {
    mongoose.connection.close();
})