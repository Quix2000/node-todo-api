var {SHA256} = require('crypto-js');
var jwt = require('jsonwebtoken');

//var message = 'I am user number 3';
//var hash = SHA256(message).toString();

//console.log('Message: ' + message);
//console.log('Hash: ' + hash);

var data = {
    id : 4
};
var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log('decoded: ' + JSON.stringify(decoded));
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'some secret').toString()
// }

// var resultHash = SHA256(JSON.stringify(toke.data) + 'some secret').toString()

// if (resultHash === token.hash){
//     console.log('Same');
// } else {
//     console.log('Different');
// }
