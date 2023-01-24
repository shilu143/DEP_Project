const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseDB = new Schema({
    courseName: {
        type: String,
        required: true
    },
    courseId:{
        type:String,
        required :true
    }
});

const courseModel = mongoose.model('course',CourseDB);

module.exports = courseModel;