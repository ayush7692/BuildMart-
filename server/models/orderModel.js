const { default: mongoose, mongo } = require("mongoose");
const User = require("./userModel");
const Product = require("./productModel");
const Vendor = require("./vendorModel");
const Coupon = require("./coupenModel");


const orderShema = new mongoose.Schema({
    user:{
        type :mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products:[{
        product:{
            type :mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required: true
        },
        purchasedPrice:{
            type:Number,
            required: true
        },
        qty:{
            type:Number,
            required: true,
            default:[1,"atleast 1 qty need"]
        },
        _id: false
    }],
    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Vendor"
    },
    status:{
        type: String,
        required: true,
        enum :["placed","cancelled","dispatch","delivered"]
    },
    isDiscounted:{
        type:Boolean,
        required:true,
        default:false

    },
    coupon:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Coupon",
        required: true
    },
    totalBillAmount:{
        type:Number,
        required:true
    }


},{
    timestamps:true
})

const Order = mongoose.model("Order",orderShema)

module.exports = Order

