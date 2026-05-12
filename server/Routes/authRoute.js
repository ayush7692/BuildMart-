const express = require('express')
const { registerUser, loginUser,private} = require('../controllers/authCOntroller')
const { forUser } = require('../middleware/authHandle')



const router = express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get("/private",forUser,private)


module.exports = router