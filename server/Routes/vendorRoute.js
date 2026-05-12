
const express = require('express')
const { forUser } = require('../middleware/authHandle')
const { becomeVendor, addProduct, getMyProduct, updateProducts, getVendors, getvendor } = require('../controllers/vendorController')
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

module.exports = router