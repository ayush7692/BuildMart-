const express = require('express')
const getCoupons = require('../controllers/couponController')
const { forUser } = require('../middleware/authHandle')


const router = express.Router()

router.get('/',forUser,getCoupons)



module.exports  = router