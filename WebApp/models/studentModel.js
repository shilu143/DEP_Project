const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    studentId: {
        type: String, 
        required: true
    },
    name : {
        type: String,
        required: true
    }
});

const studentModel = mongoose.model('studentModel',studentSchema);

module.exports = studentModel;