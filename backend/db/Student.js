const mongoose = require('mongoose')

const studentResponse = new mongoose.Schema({
    email: String,
    title: String,
    response: [
        {
            question: String,
            correctAnswer: String,
            title: String
          }
    ]
})
module.exports = mongoose.model("response", studentResponse );

