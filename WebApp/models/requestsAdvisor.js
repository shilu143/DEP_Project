const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDB = new Schema({
    advId: {
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

const userModel = mongoose.model('reqAdv',userDB);

module.exports = userModel;