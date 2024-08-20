const mongoose = require('mongoose');

//Define the Person schema
const teacherSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    subject:{
        type:String,
        required: true
    }
});

//Create model Teacher
const Teachers = mongoose.model('Teachers',teacherSchema);
module.exports = Teachers;
