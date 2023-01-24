const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const advisor = require('../models/advisor');
const instructor = require('../models/instructor');
const requestIns = require('../models/requestIns');
const requestAdvisor = require('../models/requestsAdvisor');
const studentModel = require('../models/studentModel');
const takenModel = require('../models/takenModel');
const courseModel = require('../models/coursesModel');
const statusModel = require('../models/statusModel');


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

const allStudents = ["2020csb1076@iitrpr.ac.in", "2020csb1126@iitrpr.ac.in"];
const allCourses = ["cs301", "cs302", "cs303", "cs304", "cs305"];
const allCourseName = ["DEP", "Software Engineering", "Theory of Computation", "Computer Networks", "Algorithm Design"];
const allInstId = ["2020csb1103@iitrpr.ac.in", "2020csb1103@iitrpr.ac.in", "2020csb1103@iitrpr.ac.in", "nishantgta707@gmail.com","nishantgta707@gmail.com",
]

const seedDB = async () => {
    await userModel.deleteMany({});
    await advisor.deleteMany({});
    await instructor.deleteMany({});
    await requestIns.deleteMany({});
    await requestAdvisor.deleteMany({});
    await studentModel.deleteMany({});
    await takenModel.deleteMany({});
    await courseModel.deleteMany({});
    await statusModel.deleteMany({});
    // for(let i = 0; i < 50; i++) {
    //     const random1000 = Math.floor(Math.random() * 1000);
    //     const c = new Campground({
    //         location: `${cities[random1000].city}, ${cities[random1000].state}`,
    //         title: `${sample(descriptors)} ${sample(places)}`
    //     });
    //     await c.save();
    // }
    let c = new userModel ({
        userName : '2020csb1076@iitrpr.ac.in',
        role: 0
    });
    await c.save();

    c = new userModel ({
        userName : '2020csb1126@iitrpr.ac.in',
        role: 0
    });
    await c.save();

    c = new userModel ({
        userName : '2020csb1125@iitrpr.ac.in',
        role: 2
    });
    await c.save();

     c = new userModel ({
        userName : '2020csb1103@iitrpr.ac.in',
        role: 1
    });

    await c.save();

    c = new advisor({
        advId : "2020csb1125@iitrpr.ac.in",
        advName :"Shaurya Pratap Bisht"
    });
    await c.save();

    c = new instructor({
        instId :"2020csb1103@iitrpr.ac.in",
        instName : "Nishant Verma"
    });
    await c.save();

    c = new instructor({
        instId :"2020csb1103@iitrpr.ac.in",
        instName : "Nishant Verma"
    });
    await c.save();

    c = new instructor({
        instId :"2020csb1103@iitrpr.ac.in",
        instName : "Nishant Verma"
    });
    await c.save();

    c = new instructor({
        instId :"nishantgta707@gmail.com",
        instName : "NishantGTA"
    });
    await c.save();

    c = new instructor({
        instId :"nishantgta707@gmail.com",
        instName : "NishantGTA"
    });
    await c.save();

    c = new studentModel({
        userName :"2020csb1076",
        studentId : "2020csb1076@iitrpr.ac.in",
        name: "Ashish ALok"
    });
    await c.save();

    c = new studentModel({
        userName :"2020csb1126",
        studentId : "2020csb1126@iitrpr.ac.in",
        name: "Shilu Tudu"
    });
    await c.save();

    c = new courseModel({
        courseName: "DEP",
        courseId: "cs301",
        instId: "2020csb1103@iitrpr.ac.in"
    });
    await c.save();

    c = new courseModel({
        courseName: "Software Eng.",
        courseId: "cs302",
        instId: "2020csb1103@iitrpr.ac.in"
    });
    await c.save();

    c = new courseModel({
        courseName: "Theory of Comp.",
        courseId: "cs303",
        instId: "2020csb1103@iitrpr.ac.in"
    });
    await c.save();

    c = new courseModel({
        courseName: "Computer Networks",
        courseId: "cs304",
        instId: "nishantgta707@gmail.com"
    });
    await c.save();

    c = new courseModel({
        courseName: "Algorithm Design",
        courseId: "cs305",
        instId: "nishantgta707@gmail.com"
    });
    await c.save();


    for(let student of allStudents) {
        for(let idx = 0; idx < allCourses.length; idx++) {
            c = new statusModel({
                studentId: student,
                courseId: allCourses[idx],
                courseName: allCourseName[idx],
                instId: allInstId[idx],
                status: 0
            });
            await c.save();
        }
    }

};

seedDB().then(() => {
    mongoose.connection.close();
})
