var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exports = module.exports = {};

exports.userSchema = new Schema({
    username: String
});
exports.User = mongoose.model('User',exports.userSchema);