const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// Create a User model based on the user schema
module.exports = mongoose.model("User", userSchema);