const express = require('express')
const { forUser } = require('../middleware/authHandle')
const { getCart, addToCart, updateCart, removeCart } = require('../controllers/cartController')

const router = express.Router()

router.get("/", forUser, getCart)
router.post("/", forUser, addToCart)
router.put("/", forUser, updateCart)
router.delete("/", forUser,removeCart)



module.exports = router