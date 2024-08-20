const express = require('express');
const router = express.Router();

const Person = require('./../models/Person')


//Post route to add a person
router.post('/',async (req,res)=>{
    try{
        const data = req.body  
        const newPerson = new Person(data);
        const response = await newPerson.save();    
        console.log('data saved');
        res.status(200).json(response)      
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})    
    }  
})


//Get method to get the person
router.get('/', async(req,res)=>{
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
