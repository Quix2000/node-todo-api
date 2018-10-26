require('./config/config.js');
var express = require('express');
var bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {user} = require('./models/user');
var {ObjectId} = require('mongodb');
var lodash =  require('lodash');

var app = express();
var port = process.env.PORT;

var bp = bodyParser.json();
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

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectId.isValid(id))
    {
        return res.sendStatus(404);
    } 
    Todo.findByIdAndDelete(id).then((todo) => {
        if (!todo)
        {
            return res.sendStatus(404);
        }
        res.send({todo});
     }, (e) => {
        res.status(404).send(e)
     }).catch((e) => {
        res.status(404).send(e)
        });
})

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = lodash.pick(req.body, ['text','completed']);

    if(!ObjectId.isValid(id)){
        res.status.send(404);
    }

    if (lodash.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.sendStatus(404);
        }
        res.send({todo});
    }).catch((e) => {
        res.sendStatus(400);
    })
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};