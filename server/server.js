const express = require('express')
const colors = require('colors')
const connectDB = require('./config/dbconfig')
require ('dotenv').config()

const PORT = process.env.PORT || 5000
const app = express()

// MiddleWares
app.use(express.json())
app.use(express.urlencoded())


// DB connection 
connectDB()


// All Routes import 
const authrouter = require('./Routes/authRoute')
const adminRouter = require('./Routes/adminRoute') 
const vendorRouter = require('./Routes/vendorRoute')
const productsRouter = require('./Routes/productRoute')
const errorHandle = require('./middleware/errorHandle')




// Auth Routes 
app.use('/api/auth',authrouter)

// Admin Routes 
app.use('/api/admin',adminRouter)

// Vendor Routes 
app.use('/api/vendor',vendorRouter)

// Products 
app.use('/api/products',productsRouter)

// API Testing
app.get('/',(req,res)=>{
    res.send('BuilMart API is running v1.0')
})



// Error Handler 
app.use(errorHandle)

app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`.bgBlue)
})