//Sayuri
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const feedbackSchema = new Schema({
    name:{
        type:String,
        required:true, //Validation
    },

    gmail:{
        type:String,
        required:true, //Validation
    },

    phone:{
        type:Number,
        required:true, //Validation
    },


    description:{
        type:String,
        required:true, //Validation
    },

    reply: String,  // Add this field for admin replies
    
    
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model(
    "feedbackModel", //File name
    feedbackSchema //Function name
)


