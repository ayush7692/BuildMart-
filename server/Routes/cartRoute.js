const express = require('express')
const { forUser } = require('../middleware/authHandle')
const { getCart, addToCart, updateCart, removeCartItem, clearCart } = require('../controllers/cartController')

const router = express.Router()

router.get("/", forUser, getCart)
router.post("/", forUser, addToCart)
router.put("/", forUser, updateCart)
router.put("/:productId", forUser,removeCartItem)
router.post("/clear", forUser,clearCart)



module.exports = router