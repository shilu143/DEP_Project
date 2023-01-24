const mongoose = require('mongoose');
const user = require('../models/userModel');

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
    await user.deleteMany({});
    // for(let i = 0; i < 50; i++) {
    //     const random1000 = Math.floor(Math.random() * 1000);
    //     const c = new Campground({
    //         location: `${cities[random1000].city}, ${cities[random1000].state}`,
    //         title: `${sample(descriptors)} ${sample(places)}`
    //     });
    //     await c.save();
    // }
    let c = new user ({
        userName : '2020csb1076@iitrpr.ac.in',
        role: 0
    });
    await c.save();

    c = new user ({
        userName : '2020csb1126@iitrpr.ac.in',
        role: 0
    });
    await c.save();

    c = new user ({
        userName : '2020csb1125@iitrpr.ac.in',
        role: 1
    });
    await c.save();

     c = new user ({
        userName : '2020csb1103@iitrpr.ac.in',
        role: 2
    });
    
    await c.save();
};

seedDB().then(() => {
    mongoose.connection.close();
})