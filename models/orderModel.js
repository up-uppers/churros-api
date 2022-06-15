var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var OrderSchema = new Schema({
    id: Number,
    user_id: Number,
    product_ids: Array,
    description: String,
    quantity: Number,
    price: Number,
});

module.exports = mongoose.model('OrderModel', OrderSchema);