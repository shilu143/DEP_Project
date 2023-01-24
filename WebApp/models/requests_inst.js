const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDB = new Schema({
    instId: {
        type: String,
        required: true
    },
    studId: {
        type: String,
        required: true
    },
    courseId: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model('reqInst',userDB);

module.exports = userModel;