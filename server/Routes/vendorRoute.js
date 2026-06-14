
const express = require('express')
const { forUser } = require('../middleware/authHandle')
const { becomeVendor, addProduct, getMyProduct, updateProducts, getVendors, getvendor, createCoupon, updateCoupon, getMyOrder, getUserOrder, updatedOrder, updateOrder } = require('../controllers/vendorController')
const upload = require('../middleware/imageUplodeMiddleware')


const router = express.Router()


router.post('/request',forUser,becomeVendor)
router.post('/product',forUser,upload.single('image'),addProduct)


// Get Requests
router.get('/product',forUser,getMyProduct)
router.put('/product/:pid',forUser,upload.single('image'),updateProducts)

// Vendor Profile

router.get('/profiles',getVendors)
router.get('/profiles/:vid',getvendor)

// coupons
router.post('/coupon',forUser,createCoupon)
router.put("/coupon/:cid",forUser,updateCoupon)

// Orders 

router.get('/orders',forUser,getMyOrder)
router.get('/orders/:oid',forUser,getUserOrder)
router.put('/orders/:oid',forUser,updateOrder )

module.exports = router