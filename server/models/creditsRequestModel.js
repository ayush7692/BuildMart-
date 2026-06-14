const { default: mongoose } = require("mongoose");
const User = require("./userModel");
const { request } = require("express");

const creditRequestSchema = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User" 
    },
    credits:{
        type: Number,
        required: true
    },
    isGranted:{
        type: Boolean,
        required: true,
        default : false
    }
},{
    timestamps: true
})


const CreditRequest  = mongoose.model("CreditRequest",creditRequestSchema)

module.exports = CreditRequest