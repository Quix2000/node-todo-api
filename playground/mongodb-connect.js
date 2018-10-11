var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true } ,(err, client) => {
    if (err){
        return console.log('Unable to Connect');
    }
    console.log('Connected');
    var db = client.db('TodoApp');

    db.collection('Users').insertMany([{
        name: 'Nidhi',
        age: 41,
        location: 'Pearland'
    },{
        name: 'Anand',
        age: 43,
        location: 'Pearland'
    },{
        name: 'Arnav',
        age: 7,
        location: 'Pearland'
    }], (err, result) => {
        if (err){
            console.log('Unable to Insert in Users collection');
        } else {
            console.log(JSON.stringify(result.ops, undefined, 2));
        }
    })

    // db.collection('Todos').insertOne({
    //   text: 'Something to do',
    //   completed: false  
    // }, (err, result) => {
    //     if (err){
    //         console.log('Unable to Insert', err);
    //     } else {
    //         console.log(JSON.stringify(result.ops, undefined, 2));
    //     }
    // })
    client.close();
});