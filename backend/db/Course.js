const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    title: String,
    body: String,
});

// Create a User model based on the user schema
module.exports = mongoose.model("courses", userSchema);