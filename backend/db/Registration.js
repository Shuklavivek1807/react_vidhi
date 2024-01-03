const mongoose = require ('mongoose')

const register = new mongoose.Schema({
    name: String,
    contact: String,
    email: String,
    password: String
})

module.exports = mongoose.model("student", register);