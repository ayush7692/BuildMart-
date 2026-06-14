const Coupon = require("../models/coupenModel")


const getCoupons = async(req,res)=>{
    const coupon = await Coupon.find().populate("vendor")

    if(!coupon){
        res.status(404)
        throw new Error("Coupon not found!")
    }

    res.json(coupon)
}


module.exports = getCoupons