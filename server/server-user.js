var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser : true});

var user = mongoose.model('User',{
    email : {
        type: String,
        required : true,
        minlength : 1,
        trim : true
    }
});

var firstuser = new user({
    email:'desaianand@outlook.com'
});

firstuser.save().then((doc) => {
    console.log('Saved user :', JSON.stringify(doc, undefined, 2) );
}, (err) => {
    console.log('Cannot save user');
});

