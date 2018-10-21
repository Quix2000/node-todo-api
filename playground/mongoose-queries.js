var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');
var {ObjectId} = require('mongodb');
var id = '5bcb2f7e2bd02f83840cc0a5';

ObjectId.isValid(id).then(() => {

})

// Todo.find().then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.find({
//     _id : id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

Todo.findById(id).then((temp) => {
    console.log('Todos', temp);
}).catch((e) => {
    console.log(e);
});

