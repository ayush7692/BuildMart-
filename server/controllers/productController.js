const Product = require("../models/productModel")

const getProducts = async(req,res)=>{

    const products = await Product.find()

    if(!products){
        res.status(404)
        throw new Error("Product not found")
    }

    const activeProducts= products.filter(product => product.isActive == true)

    res.status(200).json(activeProducts)

}


// single product

const getProduct =  async(req,res)=>{
    const productId = req.params.pid

    const product = await Product.findById(productId)
    
    if(!products || !product.isActive){
        res.status(404)
        throw new Error("Product not found")
    }

    res.status(200).json(product) 
}


module.exports = {getProducts,getProduct}