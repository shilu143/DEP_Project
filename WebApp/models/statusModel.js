const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const statusSchema = new Schema({
    studentId: {
        type: String,
        required: true
    },
    courseId:{
        type:String,
        required:true
    },
    courseName:{
        type: String, 
        required: true
    },
    instId : {
        type: String,
        required: true
    },
    status:{
        type : Number,
        required:true
    }
});

const statusModel = mongoose.model('status',statusSchema);

module.exports = statusModel;