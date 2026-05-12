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
    res.send("get all orders")
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


module.exports= {getAllUsers, getAllOrders, getAllProducts, getAllRatings, getAllVendors, updateUser, updateVendor}