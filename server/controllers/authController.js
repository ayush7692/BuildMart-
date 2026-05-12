const User = require('../models/userModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const registerUser = async(req,res)=>{

    const {name,email,password,phone} = req.body

    if(!name || !email || !password || !phone){
        res.status(409)
        throw new Error("Fill all details")
    }

    console.log(req.body)
    const emailExist = await User.findOne({email:email})
    const numberExist = await User.findOne({phone:phone})

    if(emailExist || numberExist){
        throw new Error("Email or Phone Number is already in Use!")
    }

    const hashPassword = await bcrypt.hash(password , 10)

    const user = await User.create({
        name,
        email,
        phone,
        password : hashPassword
    })


    res.status(200).json({
        _id : user._id,
        name:user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        isVendor: user.isVendor,
        credits : user.credits,
        createdAt : user.createdAt,
        token: jwtToken(user._id)

    }) 
}


const loginUser = async(req,res)=>{

    const{email,password} = req.body 

    const user = await User.findOne({email:email})


    if(!user){
        res.status(404)
        throw new Error("Invalid Credential")
    }

    const passwordValid = await bcrypt.compare(password,user.password)
    
      if(!passwordValid){
        res.status(404)
        throw new Error("Invalid Credential")
    }


    res.status(200).json({
        _id : user._id,
        name:user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        isVendor: user.isVendor,
        credits : user.credits,
        createdAt : user.createdAt,
        token: jwtToken(user._id)
    }) 
}


const jwtToken = (id)=>{
    return token = jwt.sign({id},process.env.SECRET_KEY,{expiresIn:"7d"})
}

const private  = async(req,res)=>{
    res.json({
        message : "ths is private "
    })
}



module.exports = {registerUser,loginUser,private}