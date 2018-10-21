var expect = require('expect');
var request = require('supertest');
var {ObjectId} = require('mongodb');
var {app} = require('./../server');
var {Todo} = require('./../models/todo');

var todos = [{
    _id : new ObjectId(),
    text : "First Todo"
},{
    _id : new ObjectId(),
    text : "Second Todo"
},{
    _id : new ObjectId(),
    text : "Third Todo"
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

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
          .get(`/todos/${todos[0]._id.toHexString()}`)
          .expect(200)
          .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
          })
          .end(done);
      });

    it('should return 404 when todo not found', (done) => {
        var objId = new ObjectId().toHexString();
        request(app)
        .get(`/todos/${objId}`)
        .expect(404)
        .end(done);
    });
    
    it('should return 404 for non-object Ids', (done) => {
        request(app)
        .get('/todos/1234')
        .expect(404)
        .end(done);
    });
})