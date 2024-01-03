const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    contact: String,
    email: String,
    course: String
});

// Create a User model based on the user schema
module.exports = mongoose.model("enquiry", userSchema);