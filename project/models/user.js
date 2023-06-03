//its basically a model or blueprint that the data of this page is looked like this 
//or the data is stored in this way 


const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    //its special type which is for producing different id
    userId: mongoose.Schema.Types.ObjectId,
    email:
    {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true }
});

// mongoose.odel takes two argument 1-> name of the model that you are gonna use 
//2-> the actual model that you are using by the name

module.exports = mongoose.model('User', userSchema);