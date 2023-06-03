//its basically a model or blueprint that the data of this page is looked like this 
//or the data is stored in this way 


const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    //its special type which is for producing different id
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productImage: { type: String, required: true }
});

// mongoose.odel takes two argument 1-> name of the model that you are gonna use 
//2-> the actual model that you are using by the name

module.exports = mongoose.model('Product', productSchema);