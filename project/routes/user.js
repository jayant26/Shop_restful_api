const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

router.post('/signup', UserController.User_signup)

router.post('/login', UserController.User_login)

router.delete('/:userId', UserController.User_delete)


module.exports = router;
