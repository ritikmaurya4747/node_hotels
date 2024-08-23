//first mongoose import
const mongoose = require('mongoose');
require('dotenv').config();

//Define the hotels connection URL*************

const mongoURL = process.env.MONGODB_URL_LOCAL;
// const mongoURL = process.env.MONGODB_URL;


//pass parameter inside curly braces  //Set up MongoDB connection 
mongoose.connect(mongoURL);

//Get the default connection
//Mongoose maintains a default connection representing the MongoDB connection
const db = mongoose.connection;

//Define event listeners for database connection
db.on('connected',()=>{
    console.log('Connected to MongoDB server');
    
})
//When occours error
db.on('error', (err)=>{
    console.log('MongoDB connection error',err);
})
//When disconnected
db.on('disconnected', ()=>{
    console.log('MongoDB disconnected',);
    
})

//Export the database connection
module.exports = db;