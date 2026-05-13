const { default: mongoose } = require("mongoose");
const Product = require("./productModel");

const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
        index:true
    },
    products:[{
        product:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Product"
         },
        qty:{
            type:Number,
            required:true,
            min:[1,"minimum allowed qty 1"],
            default: 1
        },
        _id:false
    }]
},{
    timestamps:true
})


const Cart = mongoose.model('Cart',cartSchema)

module.exports = Cart