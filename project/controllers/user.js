const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.User_signup=(req, res, next) => {
    //checking if the user is already exist
    User.find({ email: req.body.email })
        .exec()
        .then(result => {
            if (result.length > 0) {
                return res.status(409).json({
                    Message: "Email is already registered"
                })
            }
            else {

                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    }
                    else {
                        const user = new User({
                            userId: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });

                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    Message: "User created"
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })



}

exports.User_login=(req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed '
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed '
                    });

                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0].userId
                    },
                        "secret",
                        {
                            expiresIn: "1h"
                        }
                    )
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    });
                }
                return res.status(401).json({
                    message: 'Auth failed '
                });

            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.User_delete=(req, res, next) => {
    User.findByIdAndDelete(req.params.userId)
        .exec()
        .then(result => {

            res.status(201).json({
                message: "User deleted successfully"
            })


        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}


