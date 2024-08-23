// // const express =  require('express');
// // const app = express();
// // const db = require('./db');

// // app.get('/', function(req,res){
// //     res.send('Welcome to my hotel... How can i help you ?, we have list of menus');
// // })

// // app.listen(3000, ()=>{
// //     console.log('listening on port 3000!');
    
// // })   // up code is basic sample code 






// //server.js + db.js + Person.js + Teacher.js sara flow yaha se ho raha h
// //**********from here persong.js importing data to the server******************
// const express =  require('express');
// const app = express();
// const db = require('./db');

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

// const Person = require('./models/Person')
// const Teacher = require('./models/Teacher')
// const MenuItem = require('./models/Menu')

// // app.get('/', function(req,res){
// //     res.send('Welcome to my hotel... How can i help you ?, we have list of menus');
// // })
// //Person start from here
// // app.get('/person', async(req,res)=>{
// //     try{
// //         const data = await Person.find();
// //         console.log('data fetched');
// //         res.status(200).json(data) 
// //     }
// //     catch(err){
// //         console.log(err);
// //         res.status(500).json({error:'Internal server error'})
        
// //     }
// // })
// app.get('/person/:workType', async(req,res)=>{
//     try{
//         //Extract the work type from the URL parameter
//         const workType = req.params.workType;
//         if (workType === 'chef' || workType === 'manager' || workType === 'waiter') {
//             const response = await Person.find({work:workType});
//             console.log('response fetched');
//             res.status(200).json(response) 
//         }else{
//             res.status(404).json({error:'Invali work type'})
//         }
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error:'Internal server error'})
        
//     }
// })



// //Post route to add a person
// app.post('/person',async (req,res)=>{
//     try{
//         //Assuming the request body contains the person data
//         const data = req.body  
    
//         //Create a new Person document using the Mongoose model
//         const newPerson = new Person(data);

//         //Save the new person to the database
//         const response = await newPerson.save();    
//         console.log('data saved');
//         res.status(200).json(response)      
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error:'Internal Server Error'})    
//     }
    
// })


// //Teacher using post method start from here
// app.post('/teacher',async (req,res)=>{
//     try{
//         const data = req.body
//         const newTeacher = new Teacher(data);
//         const response = await newTeacher.save();
//         res.status(200).json(response)
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error:'Internal Server Ritik error'})
        
//     }
// })

// //MenuItem using get or post method start from here
// app.get('/menu', async(req,res)=>{
//     try{
//         const data = await MenuItem.find();
//         console.log('data fetched');
//         res.status(200).json(data) 
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error:'Internal server error'})
        
//     }
// })

// //GET method to get the Menu Item
// app.post('/menu',async (req,res)=>{
//     try {
//         const data = req.body;
//         const newMenu = new MenuItem(data);
//         const response = await newMenu.save();
//         res.status(200).json(response)
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({error:'Internal Server Ritik error'})
//     }
// })



// app.listen(3000, ()=>{
//     console.log('listening on port 3000');
    
// })



