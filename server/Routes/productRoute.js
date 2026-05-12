const express = require('express')
const {getProducts, getProduct } = require('../controllers/productController')

const router = express.Router()


router.get('/',getProducts)
router.get('/:pid',getProduct)



module.exports = router