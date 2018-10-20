var {mongoose} = require('./../server/db/mongoose');
var {User} = require('./../server/models/user');
var {ObjectId} = require('mongodb');
var id = '5bc68f1a5e269775f48e6b35';

if (ObjectId.isValid(id))
{ 
    User.findById(id).then((temp) => {
        console.log('Users', temp);
    }).catch((e) => {
        console.log(e);
    });
}
else{
    console.log('Invalid Object Id');
}


// User.find().then((users) => {
//     console.log('Users', users);
// });

// User.find({
//     _id : id
// }).then((users) => {
//     console.log('Users', users);
// });



