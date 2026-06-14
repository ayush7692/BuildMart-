const generateImageController = require("../controllers/generateImageCotroller")
const express = require('express')
const { forUser } = require("../middleware/authHandle")


const router = express.Router()


router.post("/floor-plan",forUser, generateImageController.generateFloorPlan)


module.exports = router