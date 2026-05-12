const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,"Please enter name"],
        minLength: 5
    },
    email:{
        type:String,
        required: [true,"Please enter email"],
        unique : true
    },
    phone:{
        type:String,
        required: [true,"Please enter number"],
        unique : true,
        spare : true

    },
    password:{
        type:String,
        required: [true,"Please enter password"],
        
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    isVendor:{
         type:Boolean,
         required:true,
        default:false
    },
    credits:{
        type : Number,
        default : 5
    }
},
{
    timestamps:true
})


const User = new mongoose.model("User",userSchema)

module.exports = User