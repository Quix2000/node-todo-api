var expect = require('expect');
var request = require('supertest');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');

var todos = [{
    text:"First Todo"
},{
    text:"Second Todo"
},{
    text:"Third Todo"
}]

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {

    it('should create a new todo', (done) => {
        var text = 'Fourth Todo';
        request(app).post('/todos').send({text}).expect(200).end((error, res) => {
            if (error){
                return done(error);
            }  
        // request(app).post('/todos').send({text}).expect(200).expect((res) => {
        //     expect(res.body.text).toBe(text);
        // })   
           Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
           }).catch((e) => done(e));
        })
    });

   

    it('should not create todo with bad data', (done) => {
        request(app).post('/todos').send({}).expect(400).end((err, res) => {
            if (err){
                return done(err);
            }

        Todo.find().then((todos) => {
            expect(todos.length).toBe(3);
            done();
        }).catch((e) => done(e));

        });

    })
});

describe('GET /todos', () => {
    it('should get all Todos', (done) => {
        request(app).get('/todos').expect(200).end((err, res) => {
            if (err){
                return done(err);
            }

        Todo.find().then((todos) => {
            expect(todos.length).toBe(3);
            done();
        }).catch((e) => done(e));
        });

    })
})