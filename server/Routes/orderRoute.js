const express = require('express')
const { forUser } = require('../middleware/authHandle')
const { createOrder, getMyOrders, getMyOrder, cancelOrder } = require('../controllers/orderController')




const router = express.Router()


router.post("/", forUser, createOrder)
router.get("/", forUser, getMyOrders)
router.get("/:oid", forUser, getMyOrder)
router.put("/:oid", forUser, cancelOrder)


module.exports = router