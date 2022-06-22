const mongoose = require('mongoose')

var Schema = mongoose.Schema;
var ProfileSchema = new Schema({
    name: String,
    role: String,
    permissions: String,
    code: Number
});

module.exports = mongoose.model('Profile', ProfileSchema)