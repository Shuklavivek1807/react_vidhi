const mongoose = require('mongoose');

const questionSetSchema = new mongoose.Schema({
  title: String,
  live: [{duration:String,startTime:Date,endTime:Date,option:String}],
  questionset: [
    {
      question: String,
      options: [String],
      correctAnswer: String,
    }
  ],
});

// Create a Paper model based on the paper schema
module.exports = mongoose.model("papers", questionSetSchema);
