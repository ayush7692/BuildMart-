const jwt = require("jsonwebtoken")
const User = require("../models/userModel")


const forUser = async(req, res, next) => {
    let token
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

            // split token form string 
            token = req.headers.authorization.split(" ")[1]
            if (!token) {
                throw new Error("token is unavailable")
            }
            // verify token with jwt 
            const decoded = jwt.verify(token, process.env.SECRET_KEY)

            // find user 
            const user = await User.findById(decoded.id).select("-password")
            if (!user) {
                res.status(404)
                throw new Error("User not found")
            }
            req.user = user
            next()
        }
    } catch (error) {
        res.status(401)
        throw new Error("Unauthorise Access")
    }
}


const forAdmin = async(req, res, next) => {
    let token
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

            // split token form string 
            token = req.headers.authorization.split(" ")[1]
            if (!token) {
                throw new Error("token is unavailable")
            }
            // verify token with jwt 
            const decoded = jwt.verify(token, process.env.SECRET_KEY)

            // find user 
            const user = await User.findById(decoded.id).select("-password")
            if (!user) {
                res.status(404)
                throw new Error("User not found")
            }
            if(user.isAdmin){
                 req.user = user
                next()
            }
            
        }else{
                res.status(401)
                throw new Error("Unauthorised Access! Admin Only")
            }
    } catch (error) {
        res.status(401)
        throw new Error("Unauthorise Access")
    }
}

module.exports = {forUser,forAdmin}