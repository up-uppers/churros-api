const mongoose = require('mongoose')

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    profile: {type: mongoose.Schema.Types.Number, ref: 'profile'},
    name: String,
    email: String,
    password: String,
    token: String
});

module.exports = mongoose.model('User', UserSchema)