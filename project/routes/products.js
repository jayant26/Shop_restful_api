//for using express
const express = require('express');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
// describing how we are gonna store the file using multer


const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});


//filtering out which type of file we want to store
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image.jpeg' || file.mimetype === 'image.png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}

//this will help in saving the file
const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1024 * 1024 * 5
    // },
    // fileFilter: filefilter
});


//setting up express router
// it will help us in handling multiple routes , reaching multiple endpoints with different http request
const router = express.Router();


const productController=require('../controllers/product');


// get will handle incoming GET request
router.get('/',productController.products_get_all );





// post will handle POST request
// post basically create or put the entries in databaase

router.post('/', checkAuth, upload.single('productImage'),productController.products_create_product);










// handling get request for a particular product id
router.get('/:productId',productController.products_get_product )


//for handling patch(update)requests
router.patch('/:productId', checkAuth,productController.products_update_product)

// for handling delete requests
router.delete('/:productId',checkAuth,productController.products_delete_product )




module.exports = router;
