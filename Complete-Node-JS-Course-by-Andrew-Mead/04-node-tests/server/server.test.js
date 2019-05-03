const request = require('supertest');
var app = require('./server').app;

describe('Server', () => {
    it('should return Hello World response', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .expect('Hello World!')
            .end(done);
    });
})


