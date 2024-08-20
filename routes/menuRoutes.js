const express = require('express');
const router= express.Router();
const MenuItem = require('./../models/Menu');
// const { route } = require('./personRoutes');
// const { update } = require('lodash');

//GET method to get the Menu Item
router.post('/',async (req,res)=>{
    try {
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        res.status(200).json(response)
    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Internal Server  error'})
    }
})

//Get method to get the menu
router.get('/', async(req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data) 
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'})
        
    }
})
router.get('/:taste', async(req,res)=>{
    try{
        //Extract the taste type from the URL parameter
        const taste = req.params.taste;
        if (taste === 'sweet' || taste === 'spicy' || taste === 'sour'){
            const data = await MenuItem.find();
            console.log('data fetched');
            res.status(200).json(data)  
        }else{
            console.log(err);
            res.status(500).json({error:'Internal server error'})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'})
        
    }
})

//For update menuRoutes list 
router.put('/:id', async (req,res)=>{
   try {
         // Extract the id from the url parameter
        const menuId = req.params.id;
        const updateMenuData = req.body;  //Updated data for the menu

        const updateMenu = await MenuItem.findByIdAndUpdate(menuId,updateMenuData,{
            new:true,   //Return the updated document
            runValidators:true,   //Run Mongoose validation
    })
    if(!updateMenu){
        return res.status(404).json({error:'Menu not found'})
    }
    console.log("data updated");
    res.status(200).json(updateMenu)
    
   } catch (err) {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
   }
}) 

//For delete menuItem list
router.delete('/:id',async(req,res)=>{
    try {
        // Extract the id from the url parameter
        const menuId = req.params.id;
        //Assuming you have a person model 
        const deleteMenu = await MenuItem.findByIdAndDelete(menuId);
        if(!deleteMenu){
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

