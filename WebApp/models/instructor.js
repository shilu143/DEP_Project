const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
    instId: {
        type: String,
        required: true
    },
    instName:{
        type:String,
        required : true
    }
});

const userModel = mongoose.model('instructor',instructorSchema);

module.exports = userModel;