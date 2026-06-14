const { default: mongoose } = require("mongoose");
const Vendor = require('../models/vendorModel')

const couponSchema = new mongoose.Schema({
    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor",
        required:true
    },
    couponCode:{
        type:String,
        required:true,
        
    },
    couponDiscount:{
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


const Coupon = mongoose.model('Coupon',couponSchema)

module.exports  = Coupon