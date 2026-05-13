const { default: mongoose } = require("mongoose");
const Vendor = require('../models/vendorModel')

const coupenSchema = mongoose.Schema({
    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor",
        required:true
    },
    coupenCode:{
        type:String,
        required:true,
        
    },
    coupenDiscount:{
        type:Number ,
        required:true
    },
    isActive:{
        type:Boolean,
        isActive:true,
        default:true
    }

},{
    timestamps: true
})

const Coupen = mongoose.model('Coupen',coupenSchema)

module.exports  = Coupen