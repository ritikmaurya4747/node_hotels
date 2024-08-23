const express =  require('express');
const app = express();
const db = require('./db'); 
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json());  //req.body
const PORT = process.env.PORT || 3000;


//Middleware Function
const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next();   //Move in to the phase
}
app.use(logRequest);

//Authentication 
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false});

app.get('/',function(req,res){
    res.send('Welcome to our Hotel')
})

//Import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes')

//Usse the routers
app.use('/person', personRoutes);
app.use('/menu',menuRoutes);


app.listen(PORT, ()=>{
    console.log('listening on port 3000');
})


