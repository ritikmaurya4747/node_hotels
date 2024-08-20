const mongoose = require('mongoose');

//Define the menu schema
const menuItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    taste:{
        type:String,
        enum:['sweet',"spicy","sour"],
        required: true
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingradients:{
        type:[String],
        default:[]
    },
    num_sales:{
        type:Number,
        default:0
    }
})

//Create model Menu
const menuItems = mongoose.model('ritik',menuItemSchema);
module.exports = menuItems;