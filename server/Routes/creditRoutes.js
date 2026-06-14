const express = require('express')
const { getCreditHistory, requestCredits } = require('../controllers/creditController')
const { forUser } = require('../middleware/authHandle')
const router = express.Router()



router.get("/", forUser, getCreditHistory)
router.post("/", forUser, requestCredits)


module.exports = router