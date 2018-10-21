var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {user} = require('./models/user');
var {ObjectId} = require('mongodb');

var app = express();

var bp = bodyParser.json();

//console.log(bp.toString());

app.use(bp);

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text : req.body.text,
        completedAt: req.body.completedAt
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    })
});

app.get('/todos', (req, res) => {
        Todo.find().then((todos) => {
            res.send({todos});
        }, (err) => {
            res.status(400).send(e);
        })
})

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectId.isValid(id)){
        res.sendStatus(404);
    } else {
     Todo.findById(id).then((todo) => {
        if (!todo){
            res.sendStatus(404);
        }
        res.send({todo});
     }, (e) => {
        res.status(404).send(e)
     }).catch((e) => {
        res.status(404).send(e)
        }); 
    }
})

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};