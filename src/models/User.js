const mongoose = require('mongoose')

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    id: Number,
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model('User', UserSchema)