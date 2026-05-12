
const fs = require("node:fs")
const Product = require("../models/productModel")
const Vendor = require("../models/vendorModel")
const uploadToCloudinary = require("../middleware/claudinaryMiddleware")


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
    const image = req.file.path
   

    const vendor = await Vendor.findOne({ user: userId })

    if (!vendor) {
        res.status(404)
        throw new Error("vendor not found")
    }

    const { name, description, price, category, stock } = req.body

    if (!name || !description || !price || !category || !stock ||!image) {
        res.status(409)
        throw new Error("Please Fill All Details!")
    }
    
    console.log(image)

    // Uplode image 
    // let uploadResult = uploadToCloudinary(image)

    // console.log(uploadResult)

    // remove from server 
    // fs.unlinkSync(image)
     


    const product = await Product.create({ name, description, price, category, stock, image:image , vendor: vendor._id })

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






module.exports = {becomeVendor,addProduct,getMyProduct,updateProducts,getVendors,getvendor}