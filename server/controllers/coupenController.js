const Coupen = require("../models/coupenModel")

const getCoupens = async(req,res)=>{
    const coupen = await Coupen.find().populate("vendor")

    if(!coupen){
        res.status(404)
        throw new Error("Coupen not found!")
    }

    res.json(coupen)
}


module.exports = getCoupens