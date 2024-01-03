const mongoose = require('mongoose')
try {
    mongoose.connect('mongodb://127.0.0.1:27017/online-exam');
    console.log('Connected to MongoDB');
} catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
}