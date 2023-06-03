const mongoose=require('mongoose');
const Product=require('../models/product');

exports.products_get_all=(req, res, next) => {

    // 1 -> it will find all the database entry
    // 2 -> select function is used to select the properties of the schema that you want to get/display like in mysql select query 
    // 3 -> Product.find will find the entries of the Product schema

    Product.find().select('name price _id productImage')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        productImage: doc.productImage,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/products/" + doc._id
                        }
                    }
                })
            }
            if (docs.length > 0) {
                // console.log(docs);
                res.status(200).json(response);

            }
            else {
                console.log("Empty");
                res.status(404).json({ message: "Not found any entries" });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })

        })
}


exports.products_create_product=(req, res, next) => {

    //creating new instance of the  Product model/Schema
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });


    //save function save the data in database
    product.save()
        //if the save function successfully runs then() function will be called
        .then(result => {
            console.log('result:', result);
            res.status(201).json({
                message: 'Created product successfully',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    id: result._id,
                    productImage: result.productImage,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/products/" + result._id
                    }
                }
            });
        })

        //else a catch() function will be called which will catch an error.
        .catch(err => {
            console.log('error:', err);
            res.status(500).json({ error: err })
        });
}


exports.products_get_product=(req, res, next) => {
    const id = req.params.productId;
    console.log(id);
    Product.findById(id).select('name price _id productImage')
        .exec()
        .then((result) => {
            if (result) {
                console.log(result);
                res.status(200).json({ result: result });
            }
            else {
                console.log("not found valid id");
                res.status(404).json({ message: "Not found the requested id" })
            }

        })
        .catch((err) => {
            console.log(err);
            console.log("not working");
            res.status(500).json({ error: err })
        })

}


exports.products_update_product= (req, res, next) => {
    const id = req.params.productId;

    //updateOps will store which prop value we want to update
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    //We will pass the id in findbyIdAndUpdate function and also the set of update operation we want to operate i.e. updateops
    Product.findByIdAndUpdate(id, { $set: updateOps })
        .exec()
        .then(result => {

            res.status(200).json({
                message: "Product updated",
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/products/" + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}


exports.products_delete_product=(req, res, next) => {
    const id = req.params.productId;
    Product.findByIdAndDelete(id)
        .exec()
        .then((result) => {
            if (result) {

                res.status(200).json({
                    message: 'Product Deleted',
                    request: {
                        type: 'POST',
                        url: "http://localhost:3000/products/",
                        body: {
                            name: 'String',
                            price: 'Number'
                        }

                    }
                });
            } else {
                console.log("document not found");
                res.status(404).json({ message: "Document not found" });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err })
        })
}