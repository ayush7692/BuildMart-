
const fs = require('fs');
const Product = require("../models/productModel")
const Vendor = require("../models/vendorModel")
const uploadToCloudinary = require("../middleware/claudinaryMiddleware");
const Coupon = require('../models/coupenModel');
const Order = require('../models/orderModel');


const becomeVendor = async(req,res)=>{

   const userId = req.user._id

   const {name,phone,email,category,address} = req.body

    const userExits = await Vendor.findOne({ user : userId }) // find vendor if already exist 


    // status validation
    if(userExits.status === "pending"){
        res.status(409)
        throw new Error("User already Requested wait for admin confirmation")
    }
    if(userExits.status === "active"){
        res.status(409)
        throw new Error("You are already a vendor No need to send request again !")
    }
    if(userExits.status === "rejected"){
        res.status(409)
        throw new Error("Your request rejected by admin please contact to admin !")
    }
    

   if( !name || !phone || !email || !category || !address){
        res.status(409)
        throw new Error("All fields are required ")
   }

   const vendor = await Vendor.create({name,phone,email,category,address, user : userId})

   if(!vendor){
        res.status(409)
        throw new Error("Vendor is not created")
   }

   res.json(vendor)
}



// Add product 

const addProduct = async (req, res) => {
    const userId = req.user._id
  
   

    const vendor = await Vendor.findOne({ user: userId })

    if (!vendor) {
        res.status(404)
        throw new Error("vendor not found")
    }

    const { name, description, price, category, stock } = req.body

    if (!name || !description || !price || !category || !stock ||!req.file.path) {
        res.status(409)
        throw new Error("Please Fill All Details!")
    }
    

    // Uplode image 
    let uploadResult = await uploadToCloudinary(req.file.path)

  

    // remove from server 
    fs.unlinkSync(req.file.path)
    
    
    
    const product = await Product.create({ name, description, price, category, stock, image:uploadResult.secure_url , vendor: vendor._id })

    if (!product) {
        res.json(409)
        throw new Error("product not create ")
    }

    res.status(201).json({
        message: "product is created",
        product
    })
}



// get All products 

const getMyProduct = async(req,res)=>{
    
    const userId = req.user._id

    
    const vendor = await Vendor.findOne({user:userId})

    if(!vendor){
        res.status(404)
        throw new Error("Vendor not found")
    }
   
    const products = await Product.find({vendor:vendor._id})
    if(!products){
        res.status(404)
        throw new Error("Product not found")
    }

    res.status(200).json(products)

}

// Update products by vendor

const updateProducts = async(req,res)=>{
    const userId = req.user._id

    const vendor = await Vendor.findOne({user:userId})
    if(!vendor){
        res.status(404)
        throw new Error("Vendor not found")
    }

    // check for product is relate to this vendor 

    const product = await Product.findById(req.params.pid)
        if(!product){
        res.status(404)
        throw new Error("product not found")
    }



    if(product.vendor.toString() !== vendor._id.toString()){
         res.status(404)
        throw new Error("Unable to update product")
    }
    
    const updateProduct = await Product.findByIdAndUpdate(req.params.pid, req.body, {new:true})
    if(!updateProduct){
        res.status(409)
        throw new Error("product not update")
    }

   res.status(200).json(updateProduct)
}


// all vendors
const getVendors = async(req,res)=>{

    const vendors = await Vendor.find()
      if(!vendors){
        res.status(404)
        throw new Error("vendor not found")
    }

    const activeVendor = vendors.filter(vendor => vendor.status==="active")

    res.status(200).json(activeVendor)
}


// single vendors
const getvendor =  async(req,res)=>{
    const vendorId = req.params.vid

    const vendor = await Vendor.findById(vendorId)
    
    if(!vendor || !vendor.status ==="active"){
        res.status(404)
        throw new Error("Vendor not found")
    }

    res.status(200).json(vendor) 
}

const createCoupon = async(req,res)=>{
    const {couponCode,couponDiscount} = req.body
    const userId = req.user

    const vendor = await Vendor.findOne({user:userId})

    if (!vendor) {
        res.status(404)
        throw new Error("Vendor not found")
    }
        if (!couponCode || !couponDiscount) {
        res.status(409)
        throw new Error("Please Fill All Details!")
    }

    const coupon = await Coupon.create({
        couponCode,couponDiscount,vendor:vendor._id
    })

        if (!coupon) {
        res.status(409)
        throw new Error("Coupon Not Created")
    }


    res.status(201).json(coupon)


}
const updateCoupon = async(req,res)=>{
    const couponId = req.params.cid
    const {couponCode,couponDiscount} = req.body
    const userId = req.user

    const vendor = await Vendor.findOne({user:userId})

    if (!vendor) {
        res.status(404)
        throw new Error("Vendor not found")
    }
        if (!couponCode || !couponDiscount) {
        res.status(409)
        throw new Error("Please Fill All Details!")
    }

    const coupon = await Coupon.findByIdAndUpdate(couponId,{couponCode,couponDiscount},{new:true})

        if (!coupon) {
        res.status(409)
        throw new Error("Coupon Not Created")
    }



    res.status(201).json(coupon)


}

const getMyOrder = async(req,res)=>{
    const userId = req.user._id

    const vendor = await Vendor.findOne({user:userId})

        if (!vendor) {
        res.status(404)
        throw new Error("Vendor not found")
    }


    const orders = await Order.findOne({vendor:vendor._id}).populate('user').populate("products.product")
        if (!orders) {
        res.status(404)
        throw new Error("Orders Not Found!")
    }


    res.json(orders)
}

const getUserOrder = async(req,res)=>{
    const userId = req.user._id
    const orderId = req.params.oid

    const vendor = await Vendor.findOne({user:userId})

        if (!vendor) {
        res.status(404)
        throw new Error("Vendor not found")
    }

    const orders = await Order.findById(orderId).populate("user").populate("products.product")

    res.status(200).json(orders)

}

const updateOrder = async(req,res)=>{
    const userId = req.user._id
    const orderId = req.params.oid
    const {status} = req.body


    if (!status) {
        res.json(409)
        throw new Error("Please Enter Status!")
    }

    const vendor = await Vendor.findOne({user:userId})

        if (!vendor) {
        res.status(404)
        throw new Error("Vendor not found")
    }

    const upadatedOrder = await Order.findByIdAndUpdate(orderId,{status},{new:true})

        if (!updatedOrder) {
        res.status(409)
        throw new Error("Order Not Updated!")
    }

    res.status(200).json(updatedOrder)
}



module.exports = {becomeVendor,addProduct,getMyProduct,updateProducts,getVendors,getvendor,createCoupon,updateCoupon,getMyOrder,getUserOrder,updateOrder}