require("dotenv").config()
const connectDB = require('./db/connected');

const product = require('./models/products')
 const productJson = require('./product.json')
const start = async ()=>{
  try {
    await connectDB(process.env.MONGODB_URL)
    // await product.create(productJson)
    await product.create(productJson)
    console.log("success");
  } catch (error) {
    console.log(error)
  }
}
start();