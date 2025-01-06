
require('dotenv').config();
const express = require('express');

const connectDB = require('./db/connected');
const product_routes = require('./routes/products');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());



// Routes

app.use('/api/products', product_routes);









// Start Server
const start = async () => {
    try {
    
        await connectDB(process.env.MONGODB_URL);
        app.listen(8000, () => {
            console.log(`Server is running and connected to DB`);
        });
    } catch (err) {
        console.log('Error starting server  :', err);
    }
};

start();
