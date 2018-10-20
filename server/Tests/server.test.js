var expect = require('expect');
var request = require('supertest');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');

beforeEach((done) => {
    Todo.remove({}).then(() => done());
});

describe('POST /todos', () => {

    it('should create a new todo', (done) => {
        var text = 'New Test';
        request(app).post('/todos').send({text}).expect(200).end((error, res) => {
            if (error){
                return done(error);
            }  
        // request(app).post('/todos').send({text}).expect(200).expect((res) => {
        //     expect(res.body.text).toBe(text);
        // })   
           Todo.find().then((todos) => {
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
            expect(todos.length).toBe(0);
            done();
        }).catch((e) => done(e));

        });

    })
});