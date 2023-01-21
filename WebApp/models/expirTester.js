const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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


const userTDB = new Schema({
    userName: {
        type: String,
        required: true
    }, 
    otp: {
        type: String
    }
    // createdAt:
    // {
    //     type:Date,
    //     expires:'2m',
    //     default:Date.now
    // }
});

const userTest = mongoose.model('userTest',userTDB);

let abc = new userTest({
    userName : "ass",
    otp: "fucku"
});
abc.save();

db.close();