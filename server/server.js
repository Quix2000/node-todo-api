var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {user} = require('./models/user');

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

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};