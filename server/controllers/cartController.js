const Cart = require("../models/cartModel")
const Product = require("../models/productModel")

const getCart = async(req,res)=>{

   const userId = req.user._id

    const cart = await Cart.findOne({user:userId}).populate("products.product")

    if (!cart) {
        res.status(200).json({
            products: []
        })
    }
     res.status(200).json(cart)
}

const addToCart = async (req, res) => {

    const userId = req.user._id
    const { product, qty } = req.body

    if (!product || qty== null) {
        res.status(409)
        throw new Error("Please Enter Product And Qty")
    }

    // Check If Product Exists
    const productExist = await Product.findById(product)

    if (!productExist) {
        res.status(404)
        throw new Error("Product Not Exist!")
    }

    // Check id product in stock
    if (productExist.stock < qty) {
        res.status(400)
        throw new Error("Insufficient Stock")
    }

        // Find Users Cart
    let cart = await Cart.findOne({ user: userId })

    if (!cart) {
      // Create new cart if does not exist
      cart = new Cart({
        user: userId,
        products: [{ product: product, qty }],
      });
    } else {
      // Check if product is already in cart
      const productIndex = cart.products.findIndex((item) => {
        return item.product.toString() === product;
      });

      if (productIndex > -1) {
        // Update Quantity if product exists
        cart.products[productIndex].qty += parseInt(qty);
        // console.log(cart.products[productIndex])

        // Check total quantity against stock
        if (cart.products[productIndex].qty > productExist.stock) {
          res.status(400);
          throw new Error("Quantity Exceeds Avaialable Stock");
        }
      } else {
        // Add New Product To Cart
        cart.products.push({ product: product, qty });
      }
    }

    await cart.save()

    // Populate Product Details For Response
    await cart.populate("products.product")

   

    res.status(200).json(cart)


}


const updateCart = async (req, res) => {
      const { product, qty } = req.body
      const userId = req.user._id

    if ( qty<1 || !product  ) {
        res.status(409)
        throw new Error("Please Enter Qty and product")
    }

    const productExist = await Product.findById(product)

    if(qty> productExist.stock){
        res.status(409)
        throw new Error("Stock not available")
    }

    const cart = await Cart.findOne({user:userId})

    if(!cart){
        res.status(404)
        throw new Error("No cart found")
    }

    const productIndex = cart.products.findIndex((item)=>{
        return item.product.toString() === product
    })
        
    if(productIndex === -1){
        throw new Error("please add product in cart first")

    }

         cart.products[productIndex].qty = parseInt(qty)

        
        if(cart.products[productIndex].qty> productExist.stock){
            res.status(409)
            throw new Error("limit exceed")
        }
    

    await cart.save()

    await cart.populate('products.product')

    res.json(cart)
}

const removeCartItem = async (req, res) => {

    const { productId } = req.params;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        res.status(404)
        throw new Error("Cart not found")
    }

    // Filter out the product
    cart.products = cart.products.filter(
        (item) => item.product.toString() !== productId
    );

    await cart.save();
    await cart.populate('products.product');

    res.status(200).json(cart);
}

const clearCart = async(req,res)=>{
     const userId = req.user._id

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        res.status(404)
        throw new Error("Cart Not Found!")
    }

    cart.products = [];
    await cart.save();

    res.status(200).json(cart);
}

module.exports = {getCart,addToCart,updateCart,removeCartItem,clearCart}