var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var produtSchema = new Schema({
    "productId":String,
    "productName":{type:String},
    "salePrice":Number,
    "productImage":String
})

module.exports = mongoose.model('Good',produtSchema);