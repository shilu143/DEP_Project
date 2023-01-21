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
    },
    createdAt:
    {
        type: Date,
        expires: '1m',
        default: Date.now
    }
    
});

const userTest = mongoose.model('userTest',userTDB);

const seedDB = async () => {
    await userTest.deleteMany({});
    // for(let i = 0; i < 50; i++) {
    //     const random1000 = Math.floor(Math.random() * 1000);
    //     const c = new Campground({
    //         location: `${cities[random1000].city}, ${cities[random1000].state}`,
    //         title: `${sample(descriptors)} ${sample(places)}`
    //     });
    //     await c.save();
    // }
    let c = new userTest ({
        userName : 'testing now',
        otp : '45651'
    });
    await c.save();
};

seedDB().then(() => {
    mongoose.connection.close();
})
