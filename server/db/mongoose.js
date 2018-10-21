var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI || 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });

module.exports = { mongoose }