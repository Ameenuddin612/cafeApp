// name , phone no. , sum of all the ratings , total no. of ratings
const { name } = require('ejs');
const mongoose = require('mongoose');

const objectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    ratingSum: {
        type: Number,
        required: true
    },
    ratingCount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Object", objectSchema);