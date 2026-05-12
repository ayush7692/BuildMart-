const express = require('express')
const { forAdmin } = require('../middleware/authHandle')
const { getAllUsers, getAllVendors, getAllProducts, getAllOrders, getAllRatings, updateUser, updateVendor } = require('../controllers/adminController')

const router = express.Router()

// All get request of Vendor
router.get('/users',forAdmin,getAllUsers)
router.get('/vendors',forAdmin,getAllVendors)
router.get('/products',forAdmin,getAllProducts)
router.get('/orders',forAdmin,getAllOrders)
router.get('/ratings',forAdmin,getAllRatings)

// All put request of Vendor 

router.put('/users/:uid',forAdmin,updateUser )
router.put('/vendors/:vid',forAdmin,updateVendor)





module.exports = router