//its basically a model or blueprint that the data of this page is looked like this 
//or the data is stored in this way 


const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
    //its special type which is for producing different id
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 },
});

// mongoose.odel takes two argument 1-> name of the model that you are gonna use 
//2-> the actual model that you are using by the name

module.exports = mongoose.model('Order', orderSchema);