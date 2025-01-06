const mongoose = require('mongoose');
 const connectDB = (uri)=>{
    console.log("connected data")
    return mongoose.connect(uri )
}
module.exports = connectDB