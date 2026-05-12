const { mongoose } = require("mongoose")
require('dotenv').config()

const connectDB = async () => {
    try {
       const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB CONNECTION SUCCESS : ${conn.connection.name}`.bgGreen)
        
    } catch (error) {
        console.log(error.message.bgRed)
    }
}


module.exports = connectDB