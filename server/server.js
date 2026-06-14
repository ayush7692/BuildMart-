const express = require('express')
const colors = require('colors')
const connectDB = require('./config/dbconfig')
require ('dotenv').config()

const PORT = process.env.PORT || 5000
const app = express()

// MiddleWares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});


// DB connection 
connectDB()


// All Routes import 
const authrouter = require('./Routes/authRoute')
const adminRouter = require('./Routes/adminRoute') 
const vendorRouter = require('./Routes/vendorRoute')
const productsRouter = require('./Routes/productRoute')
const couponRouter = require('./Routes/couponRoute')
const cartRouter = require('./Routes/cartRoute')
const orderRouter = require('./Routes/orderRoute')
const imageRoutes = require('./Routes/generateImageRoute')
const creditRoutes = require('./Routes/creditRoutes')
const errorHandle = require('./middleware/errorHandle')




// Auth Routes 
app.use('/api/auth',authrouter)

// Admin Routes 
app.use('/api/admin',adminRouter)

// Vendor Routes 
app.use('/api/vendor',vendorRouter)

// Products 
app.use('/api/products',productsRouter)

// Coupen
app.use('/api/coupons',couponRouter)

// Cart 
app.use('/api/cart',cartRouter)

// Order
app.use('/api/order',orderRouter)

// image generate 
app.use("/api/generate", imageRoutes)

// Credits
app.use("/api/credits", creditRoutes)


// API Testing
app.get('/',(req,res)=>{
    res.send('BuilMart API is running v1.0')
})



// Error Handler 
app.use(errorHandle)

app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`.bgBlue)
})