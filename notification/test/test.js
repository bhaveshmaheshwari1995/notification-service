let chai = require('chai');
let chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);

let server = require('../app');
//Our parent block
describe('notifications', () => {
 describe('GET /v1/notification', () => {
     it('it should check server state', (done) => {
     chai.request(server)
       .get('/v1/notification')
       .end((err, res) => {
             (res).should.have.status(200);
             done();
          });
       });
  });
});

//Add more tests here