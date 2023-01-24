const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDB = new Schema({
    userName: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true
    }
});

const userModel = mongoose.model('userModel',userDB);

module.exports = userModel;