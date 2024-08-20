//first mongoose import
const mongoose = require('mongoose');

//Define the hotels connection URL
//Replace 'mydatabase' with your hotels name anything  local
// const mongoURL = 'mongodb://localhost:27017/hotels'

const mongoURL = 'mongodb+srv://ritikmaurya4747:Ritik%40mongodb@cluster0.9t7p4.mongodb.net/'

//pass parameter inside curly braces\
//Set up MongoDB connection 
mongoose.connect(mongoURL,{
    useNewUrlParser: true,     //this is saying mongourl is new connection
    useUnifiedTopology: true   //this line is mandatory
})

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