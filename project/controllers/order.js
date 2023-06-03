const Order = require('../models/order');
const Product=require('../models/product');
const mongoose = require('mongoose');
exports.orders_get_all= (req, res, next) => {
    Order.find()
        .select('product quqntity _id')
        .populate('product', 'name')
        .exec()
        .then((result) => {
            const orders = {
                count: result.length,
                orders: result.map(order => {
                    return {
                        id: order._id,
                        product: order.product,
                        quantity: order.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/' + order._id
                        }
                    }
                })

            }
            res.status(200).json(orders);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
}

exports.orders_create_order=(req, res, next) => {
    Product.findById(req.body.productId)
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: "This product is not available"
                })
            }
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            })

            return order.save()


        }).then((result) => {
            console.log(result);
            res.status(201).json({
                message: "Order stored",
                id: result._id,
                product: result.product,
                quantity: result.quantity,
                request:
                {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + result._id
                }
            });
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
}

exports.orders_get_order= (req, res, next) => {
    Order.findById(req.params.orderId).populate('product')
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: "No order is available"
                })
            }
            res.status(200).json({
                order: result,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders'
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}


exports.orders_delete_order=(req, res, next) => {
    const id = req.params.orderId;
    Order.findByIdAndDelete(id).exec()
        .then((result) => {
            console.log("Successfully deleted the order");
            res.status(200).json({
                message: "deleted the order with order id: " + id
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}