const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advisorSchema = new Schema({
    advId: {
        type: String,
        required: true
    },
    advName:{
        type:String
    },
});

const userModel = mongoose.model('advisor',advisorSchema);

module.exports = userModel;