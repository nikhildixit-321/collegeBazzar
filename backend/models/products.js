const { urlencoded } = require('express');
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image: {
        type: String, // Usually, the image field will hold a URL or a file path
        required: false,
      },
    description:{
        type:String,
        
    },
    category:{
        type:String,
    },
   
   price:{
        type:Number,
        required:true
    },  

   featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.9
    },
    createAt:{
        type:Date,
        default:Date.now(),
    },
    company:{
        type:String,
        // enum:{
        //     values:["apple","samsung","dell","mi"],
        //     message:`{value} is not supported`,
        // },
    },


})
module.exports = mongoose.model("Product",productSchema);