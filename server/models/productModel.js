const { default: mongoose } = require("mongoose");
const Vendor = require("./vendorModel");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref : "Vendor"
    },
    isActive:{
        type: Boolean,
        required: true,
        default: true
    },
},{
    timestamps:true
})


const Product = mongoose.model("Product",productSchema)

module.exports = Product