const { default: mongoose } = require("mongoose");

const vendorSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    name:{
        type : String,
        required: [true,"Please Enter Vendor name"]
    },
    email:{
        type : String,
        required: [true,"Please Enter Email"]
    },
    phone:{
         type : String,
        required: [true,"Please Enter phone number "]
    },
    address:{
        type : String,
        required: [true,"Please Enter address"]
    },
    category:{
        type : String,
        required: [true,"Please Enter category"]
    },
    
    status:{
        type : String,
        required: true,
        enum :["pending","active","suspended","hold"],
        default : "pending"
    }
    

},{
    timestamps:true
})


const Vendor = mongoose.model("Vendor",vendorSchema )

module.exports = Vendor