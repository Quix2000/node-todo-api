var {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID('5bbf38f7be8ab25b3afc5773');


MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true } ,(err, client) => {
    if (err){
        return console.log('Unable to Connect');
    }
    console.log('Connected');
    var db = client.db('TodoApp');
    
    db.collection('Users').find({name:'Arnav'}).toArray().then((docs) => {
        var allDocs = JSON.stringify(docs, undefined, 2);
        console.log(allDocs);
    }, (err) => {
        if (err){
            console.log('Error');
        }
    })

    // db.collection('Todos').find({_id:obj}).toArray().then((docs) => {
    //     var allDocs = JSON.stringify(docs, undefined, 2);
    //     console.log(allDocs);
    // }, (err) => {
    //     if (err){
    //         console.log('Error');
    //     }
    // })
    
    //client.close();
});