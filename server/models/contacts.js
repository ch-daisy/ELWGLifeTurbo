'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ContactSchema = new Schema({
    name: String,
    sex: String,
    grade: String,
    mobile: String,
    qq: String,
    email: String,
    teacher: String
});

module.exports = mongoose.model('info', ContactSchema);
