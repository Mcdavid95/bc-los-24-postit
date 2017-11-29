import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../serverTest';
import { newUser1 } from '../seeders/authSeeds';

chai.use(chaiHttp);
const api = supertest.agent(server);
const should = chai.should();
const expect = chai.expect;

let token;

describe('Login Route', () => {
  it('should login user', (done) => {
    api
      .post('/api/v1/user/login')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(newUser1)
      .end((err, res) => {
        token = res.body.token;
        res.status.should.equal(202);
        res.body.message.should.equal(`Welcome back ${newUser1.username}`);
        done();
      });
  });
});

describe('Message Routes', () => {
  it('should not parse groupId as string in params', (done) => {
    api
      .post('/api/v1/group/h3e/message')
      .set('Connetion', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        username: 'elejo'
      })
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.message.should.equal('Please groupId must be a number');
        done();
      });
  });

  it('should not post message with invalid priority', (done) => {
    api
      .post('/api/v1/group/1/message')
      .set('Connetion', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        message: 'you',
        priority: 'junk'
      })
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.Error.should.equal('Priority not valid, Please use either: normal, critical, or, urgent');
        done();
      });
  });

  it('should post message to a group with urgent priority', (done) => {
    api
      .post('/api/v1/group/2/message')
      .set('Connetion', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        message: 'hi',
        priority: 'urgent'
      })
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('hi');
        done();
      });
  });
  it('should post message to a group with crirtical priority', (done) => {
    api
      .post('/api/v1/group/2/message')
      .set('Connetion', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        message: 'hello',
        priority:
         'critical'
      })
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('hello');
        done();
      });
  });

  it('should not post message to a group you do not belong to', (done) => {
    api
      .post('/api/v1/group/1/message')
      .set('Connetion', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        message: 'hello',
        priority:
         'critical'
      })
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.Error.should.equal('You do not belong to group with id: 1');
        done();
      });
  });
});
