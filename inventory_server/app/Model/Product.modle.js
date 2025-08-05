const mongoose= require('mongoose')

const productSchema= new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    picture: {
        type :string ,
        require: true
    }
});

const products = mongoose.model('products',productSchema)
module.exports= {products}