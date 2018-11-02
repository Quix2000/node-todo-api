require('./config/config.js');
var express = require('express');
var bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectId} = require('mongodb');
var lodash =  require('lodash');

var app = express();

var bp = bodyParser.json();

app.use(bp);
app.get('/users/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectId.isValid(id)){
        res.sendStatus(404);
    } else {
     User.findById(id).then((user) => {
        if (!user){
            res.sendStatus(404);
        }
        res.send({user});
     }, (e) => {
        res.status(404).send(e)
     }).catch((e) => {
        res.status(404).send(e)
        }); 
    }
});

app.post('/users', (req, res) => {
    var body = lodash.pick(req.body, ['email', 'password']);
    var user = new User(body);
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);    
    })
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};