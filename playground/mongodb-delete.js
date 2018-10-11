var {MongoClient, ObjectId} = require('mongodb');
var obj = new ObjectId('5bbf57b5cbfb025d1fc7b3d1');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true } ,(err, client) => {
    if (err){
        return console.log('Unable to Connect');
    }
    console.log('Connected');
    var db = client.db('TodoApp');

    db.collection('Users').deleteMany({name:'Nidhi'}).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
        console.log(result);
    });
    client.close();
});