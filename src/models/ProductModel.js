var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ProductSchema = new Schema({
    id: Number,
    name: String,
    description: String,
    type: String,
    preco: Number,
    foto: String
});

module.exports = mongoose.model('ProductModel', ProductSchema);