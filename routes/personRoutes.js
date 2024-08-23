const express = require('express');
const router = express.Router();

const Person = require('./../models/Person')
const {jwtAuthMidleware, generateToken} = require('./../jwt');

//Post route to add a person
router.post('/signup',async (req,res)=>{  
    try{
        const data = req.body  //Assuming the request body contains the person data

        //Create a new Person document using the mongoose model
        const newPerson = new Person(data);

        //Save the new person to the database 
        const response = await newPerson.save();    
        console.log('data saved');

        //Calling token
        const payload ={
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));
        
        const token = generateToken(payload);
        console.log("Token is : ", token);

        res.status(200).json({response: response, token: token});      
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})    
    }  
})


//Login route
router.post('/login', async(req,res)=>{
    try {
        // Extract username and password from request body
        const {username, password} = req.body;

        //Find the user by username
        const user = await Person.findOne({username: username});

        //If user does not exist or password does not match return error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'Invalid username or password'});
        }
        //generate Token
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        //return token as response 
        res.json({token})
    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Internal server Error'})
    }
})


//Get method to get the person
router.get('/',jwtAuthMidleware, async(req,res)=>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data) 
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'})
        
    }
})

router.get('/:workType', async(req,res)=>{
    try{
        //Extract the work type from the URL parameter
        const workType = req.params.workType;
        if (workType === 'chef' || workType === 'manager' || workType === 'waiter'){
            const response = await Person.find({work:workType});
            console.log('response fetched');
            res.status(200).json(response) 
        }else{
            res.status(404).json({error:'Invalid work type'})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'})
        
    }
})


//For update person list 
router.put('/:id', async (req,res)=>{
    try {
        // Extract the id from the url parameter
        const personId = req.params.id;  
        const updatedPersonData = req.body;  //Updated data for the person
        
        const updatePerson = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new: true,             //Return the updated document
            runValidators: true,  //Run Mongoose validation
        })
        if(!updatePerson){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data updated');
        res.status(200).json(updatePerson);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
        
    }
})


//For delete person list
router.delete('/:id',async (req,res)=>{
    try {
        //Extract the person's ID from the URL parameter
        const personId = req.params.id;
        
        //Assuming you have a person model 
        const deletePerson = await Person.findByIdAndDelete(personId);
        if(!deletePerson){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message:'person Deleted successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
    }
})

module.exports = router;