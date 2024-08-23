const jwt = require('jsonwebtoken');
const { take } = require('lodash');

const jwtAuthMidleware = (req,res,next)=>{

    //First check request headers has authorization or not 
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error:'Token not found'})

    //Extract the jwt token from the request header
     const taken = req.headers.authorization.split(' ')[1];
     if(!taken) return res.status(401).json({error:'Unathorized'});

     try {
        //verify the JWT taken
        const decoded = jwt.verify(taken,process.env.JWT_SECRET);

        //Attach user information to the request object 
        req.user = decoded
        next();
     } catch (err) {
        console.log(err);
        res.status(401).json({error: 'Invalid taken'});
        
     }
}


//Funtions to  generate JWT token
const generateToken = (userData) =>{
    // Generate a new JWT token using use data 
    return jwt.sign(userData, process.env.JWT_SECRET,{expiresIn:30000});
}


module.exports = {jwtAuthMidleware, generateToken}