//using the package express
const express = require('express');
const mongoose=require('mongoose');
const morgan = require('morgan');
// const bodyParser=require('body-parser');
//it will create a express application
const app = express();
const dotenv=require('dotenv');
dotenv.config({path:"./config.env"});
// morgan package is used to log the incoming requests
app.use(morgan('dev'));

//for publicly accessing the uploads folder
app.use('/uploads',express.static('uploads'));


//bosy parser is used to parse the body of incoming request 
// it support url encoded and it also support json data 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//importing product routes 
// these are routes which handle request
//handle product requests


const productRoutes = require('./project/routes/products');

// handle orders requests
const orerRoutes = require('./project/routes/orders');

// handle user signup request

const userRoutes=require('./project/routes/user');




// if password contain special characters like @ # , you have to encode it in %+hex code of that character
mongoose.connect("mongodb+srv://jayantjain2609:07432241242@node-shop-app.ke8idrm.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true

});


app.use('/products', productRoutes);
app.use('/orders', orerRoutes);
app.use('/user',userRoutes);

//it will act as a middleware , any request will go through app.use
// first argument is basically a filter , here that is /products that means it will handle
// all the request which will start with /products
// productsRoutes will handle the request of products , it will direct to products.js file


//fro catching error that get past the valid request or error handling for invalid 
//invalid request
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    // it will forward the error request
    next(error);

});

// it will handle all type of error
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

// it will used to export app.js so that we can use it in server.js
// module.exports=app;
const port = 3000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

//post method uses status code 201
// get method uses status mode 200