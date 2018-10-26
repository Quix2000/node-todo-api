var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true });

module.exports = { mongoose }