const express = require('express')
const getCoupens = require('../controllers/coupenController')
const { forUser } = require('../middleware/authHandle')

const router = express.Router()

router.get('/',forUser,getCoupens)



module.exports  = router