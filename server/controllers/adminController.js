const CreditRequest = require("../models/creditsRequestModel")
const User = require("../models/userModel")
const Vendor = require("../models/vendorModel")

const getAllUsers = async(req,res)=>{
     const users = await User.find()

    if (!users) {
        res.status(404)
        throw new Error("Users Not Found!")
    }

    res.status(200).json(users)
}



// All Vendor
const getAllVendors = async(req,res)=>{
     const vendors = await Vendor.find()

    if (!vendors) {
        res.status(404)
        throw new Error("Vendors Not Found!")
    }

    res.status(200).json(vendors)

}



// all products 
const getAllProducts = async(req,res)=>{
     const products = await Product.find()

    if (!products) {
        res.status(404)
        throw new Error("Product Not Found!")
    }



    res.status(200).json(products)
}



const getAllOrders = async(req,res)=>{
   
    const orders = await Order.find()

    if (!orders) {
        res.status(404)
        throw new Error("Orders Not Found!")
    }



    res.status(200).json(orders)
}

const getAllRatings = async(req,res)=>{
    res.send("get all rating")
}



const updateUser = async(req,res)=>{
    res.send("updaet users")
}

const updateVendor = async(req,res)=>{
   const vendorId = req.params.vid
   const {status} = req.body



    // find request is present in vendor schema 
   const vendor = await Vendor.findById(vendorId)

   if(!vendor){
        res.status(404)
        throw new Error("vendor not found")
   }

   // update status
   const updateVedor = await Vendor.findByIdAndUpdate(vendor._id,{status},{new:true})

   if(!updateVedor){
        res.status(409)
        throw new Error("vendor not update ")
   }

   // update user 
   const updateUser = await User.findByIdAndUpdate(vendor.user,{isVendor:true},{new:true}) 

   if(!updateUser){
        res.json(409)
        throw new Error("vendor not update ")

   }

   res.status(200).json(vendor)

}

const updateCredits  = async(req,res)=>{
    const requestId = req.params.rid
    const {isGranted} = req.body

    const status  = JSON.parse(isGranted)

     if (!isGranted) {
        res.status(409)
        throw new Error('Status Not Found!')
    }

    const request = await CreditRequest.findOne({_id:requestId})
     if (!request) {
        res.status(404)
        throw new Error("Credit Request Not Found!")
    }

    if(request){

   const updateRequest = await User.findByIdAndUpdate(
     request.user,
     {
       $set: { isGranted: status },
       $inc: { credits: request.credits },
     },
     { new: true },).select("-password");
       
   
    res.status(200).json({
            message: "Credits Granted",
            creditRequest: updateRequest})
    }else{
        res.status(409)
        throw new Error("Credits Not Granted!")
    }        

}


module.exports= {getAllUsers, getAllOrders, getAllProducts, getAllRatings, getAllVendors, updateUser, updateVendor,updateCredits}