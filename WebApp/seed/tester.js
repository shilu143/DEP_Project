const mongoose = require('mongoose');
const user = require('../models/user');
const bcrypt = require('bcrypt');

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

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    const OTP = 12345;
    let newHash="ashish";
    const saltRounds = await bcrypt.genSalt(10);
    await bcrypt.hash(String(OTP), saltRounds).then(function(hash) {
        // Store hash in your password DB.
        newHash = hash;
    });
    const result = await user.findOneAndUpdate({userName : '2020csb1076@iitrpr.ac.in'}, {otp : newHash}, {new : true});
    console.log(result)
};

seedDB().then(() => {
    mongoose.connection.close();
});