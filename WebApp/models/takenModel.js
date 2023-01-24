const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const takenDB = new Schema({
    studentId: {
        type: String,
        required: true
    },
    courseTaken: {
        type:String,
        required:true
    }
});

const takenModel = mongoose.model('takenCourses',takenDB);

module.exports = takenModel;